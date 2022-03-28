const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000
let path = require('path')
const { render } = require('express/lib/response')
const app = express()

//chamando a classe
const objUser = require('./model/User')
const { rejects } = require('assert')

//Configs
    app.use(session({secret: 'todosamamosmuitoprogramar'}))
    app.use(bodyParser.urlencoded({extended:true}))

    app.engine('html', require('ejs').renderFile);
    app.set ('view engine', 'html')
    app.use('/public', express.static(path.join(__dirname, 'public')));
    app.set ('views', path.join(__dirname, '/views'))

//Rotas
    app.post('/cadastrando', (req, res) => {
        objUser.nome = req.body.nome
        objUser.login = req.body.login
        objUser.psw = req.body.psw

        req.session.login = objUser.login
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
                req.session.login = objUser.login
            res.render('home', {login: objUser.login})
            }
            else
                res.render('index')
        }, (err) => {
            console.log(err);
        })
    })

    app.get('/', (req, res) => {
        if(req.session.login){
            res.render('home', {login: objUser.login})
        }
        else{
           res.render('index') 
        }
        
    })

//Funções
    const insertUser = async (objUser) => {
        const daoUser = require('./controller/UserDAO')
        await daoUser.insertUser(objUser)
    }

    const selectUser = (objUser) => {
        const daoUser = require('./controller/UserDAO')
        return  new Promise( async (resolve, rejects) => {
            resolve(await daoUser.selectUser(objUser))
        })
    }

app.listen(port, () => {
    console.log("Servidor rodando!")
})