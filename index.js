const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000
let path = require('path')
const { render } = require('express/lib/response')
const app = express()

//call the class
const objUser = require('./model/User')

//Configs
    app.use(session({secret: 'todosamamosmuitoprogramar'}))
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(express.static(__dirname + 'public'))
    app.use('/css', express.static(__dirname + 'public/css'))

    app.engine('html', require('ejs').renderFile);
    app.set ('view engine', 'html')
    app.use('/public', express.static(path.join(__dirname, 'public')));
    app.set ('views', path.join(__dirname, '/views'))

//Routers
    app.post('/cadastrando', (req, res) => {
        objUser.nome = req.body.nome
        objUser.login = req.body.login
        objUser.psw = req.body.psw

        req.session.login = objUser.login
        req.session.nome = objUser.nome
        insertUser(objUser)
        res.redirect('/')
    })

    app.post('/logout', (req, res) => {
        req.session.destroy()
        res.redirect('/')
    })

    app.post('/cadastro.html', (req, res) => {
        if(req.session.login){
            res.redirect('/')
        }
        else{
            res.render('cadastro')
        }
    })

    app.post('/', (req, res) => {
        objUser.login = req.body.login
        objUser.psw = req.body.psw
        selectUser(objUser).then((user) => {
            if(user){
                req.session.user = user
                res.render('home', {name: req.session.user.nome, login: req.session.user.login})
            }
            else
                res.render('index')
        }, (err) => {
            console.log(err);
        })
    })

    app.get('/', (req, res) => {
        if(req.session.login){
            res.render('home', {name: req.session.user.nome, login: req.session.user.login})
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


    //ItemsList funtions

//Run Server
app.listen(port, () => {
    console.log("Servidor rodando!")
})