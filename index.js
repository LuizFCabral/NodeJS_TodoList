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
            console.log(err);
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
                    req.session.list = list
                    req.session.user = user
                    console.log()
                    res.render('home', {name: user.nome, login: user.login, list: list })
                }, (err) => {
                    console.log(err);
                })
            }
            else
                res.render('index')
        }, (err) => {
            console.log(err);
        })
    })

    //pagina inicial
    app.get('/', (req, res) => {
        if(req.session.user){
            res.render('home', {name: req.session.user.nome, login: req.session.user.login, list: req.session.list})
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

    //TodoList functions
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