const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000
let path = require('path')
const { render, redirect } = require('express/lib/response')
const app = express()

//calling the class
const objUser = require('./model/User')
const objList = require('./model/TodoList')
const objItem = require('./model/ItemsList')
const { resolve } = require('path')

//Configs
    app.use(session({secret: 'todosamamosmuitoprogramar'}))
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(express.static(__dirname + '/public'))
    app.use('/css', express.static(__dirname + 'public/css'))
    app.use('/js', express.static(__dirname + 'public/js'))
    app.set ('view engine', 'ejs')

//Routers
    //funções do header da lista
    app.post('/headerFunc', (req, res) => {
        objList.id = req.body.id

        deleteTodoList(objList)
        selectList(objList).then((list) => {
            req.session.list = list
            res.redirect('/')
        }, (err) => {
            console.log(err)
        })
    })

    //cadastro de item
    app.post('/addItem', (req, res) => {
        objItem.idList = req.body.id
        objItem.descr = req.body.descrItem

        req.session.item = objItem
        insertItem(objItem)
        selectItemByUser(req.session.user.id).then((items) => {
            req.session.items = items
            res.redirect('/')
        }, (err) => {
            console.log(err)
        })
    })


    //cadastro do usuario
    app.post('/cadastrando', (req, res) => {
        objUser.nome = req.body.nome
        objUser.login = req.body.login
        objUser.psw = req.body.psw

        req.session.login = objUser.login
        req.session.nome = objUser.nome
        insertUser(objUser)
        res.redirect('/')
    })

    //adicionando lista
    app.post('/addList', (req, res) => {
        
        objList.idUser = req.session.user.id
        objList.descr = req.body.descr
        insertList(objList)
        selectList(objList).then((list) => {
            req.session.list = list
            res.redirect('/')
        }, (err) => {
            console.log(err)
        })
    })

    //deslogar
    app.post('/logout', (req, res) => {
        req.session.destroy()
        res.redirect('/')
    })

    //pagina de cadastro
    app.post('/cadastro.html', (req, res) => {
        if(req.session.login){
            res.redirect('/')
        }
        else{
            res.render('cadastro')
        }
    })

    //login
    app.post('/', (req, res) => {
        objUser.login = req.body.login
        objUser.psw = req.body.psw
        selectUser(objUser).then((user) => {
            if(user){
                objList.idUser = user.id
                selectList(objList).then((list) => {
                    selectItemByUser(user.id).then((items) => {
                        req.session.list = list
                        req.session.user = user
                        req.session.items = items
                        res.render('home', {name: user.nome, login: user.login, list: list, items: items})
                    })
                   
                }, (err) => {
                    console.log(err)
                })
            }
            else
                res.render('index')
        }, (err) => {
            console.log(err)
        })
    })


    //pagina inicial
    app.get('/', (req, res) => {
        if(req.session.user){
            res.render('home', {name: req.session.user.nome, login: req.session.user.login,
                list: req.session.list, items: req.session.items})
        }
        else{
           res.render('index') 
        }
        
    })

//Functions
    //User functions
        const insertUser = async (objUser) => {
            const daoUser = require('./controller/UserDAO')
            await daoUser.insertUser(objUser)
        }

        const selectUser = (objUser) => {
            const daoUser = require('./controller/UserDAO')
            return  new Promise( async (resolve) => {
                resolve(await daoUser.selectUser(objUser))
            })
        }

    //List functions
        const insertList = async (objList) => {
            const daoList = require('./controller/TodoListDAO')
            await daoList.insertTodoList(objList)
        }

        const selectList = (objList) => {
            const daoList = require('./controller/TodoListDAO')
            return new Promise ( async (resolve) => {
                resolve(await daoList.selectAllTodoList(objList))
            })
        }

        const deleteTodoList = async(objList) => {
            const daoList = require('./controller/TodoListDAO')
            await daoList.deleteTodoList(objList)
        }

    //ItemsList funtions
        const insertItem = async (objItem) => {
            const daoItem = require('./controller/ItemsListDAO')
            await daoItem.insertItemsList(objItem)
        }

        const selectItem = (objItem) => {
            const daoItem = require('./controller/ItemsListDAO')
            return new Promise ( async (resolve) => {
                resolve(await daoItem.selectAllItemsList(objItem))
            })
        }

        const selectItemByUser = (idUser) => {
            const daoItem = require('./controller/ItemsListDAO')
            return new Promise ( async (resolve) => {
                resolve(await daoItem.selectItemsByUser(idUser))
            })
        }

        const updateItem = (objItem) => {
            const daoItem = require('./controller/ItemsListDAO')
            return new Promise ( async (resolve) => {
                resolve(await daoItem.selectAllTodoList(objItem))
            })
        }

//Run Server
app.listen(port, () => {
    console.log("Servidor rodando!")
})
