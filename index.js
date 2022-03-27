const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000
let path = require('path')
const app = express()


//Configs
    app.use(session({secret: 'todosamamosmuitoprogramar'}))
    app.use(bodyParser.urlencoded({extended:true}))

    app.engine('html', require('ejs').renderFile);
    app.set ('view engine', 'html')
    app.use('/public', express.static(path.join(__dirname, 'public')));
    app.set ('views', path.join(__dirname, '/views'))

//Rotas
    app.post('/home.html', (req, res) => {
        const objUser = require('./model/User')

        objUser.nome = req.body.nome
        objUser.login = req.body.login
        objUser.psw = req.body.psw

        req.session.login = objUser.login
        insertUser(objUser)
        res.render('home', {login: objUser.login})
    })

    app.post('/cadastro.html', (req, res) => {
        res.render('cadastro')
    })

    app.get('/', (req, res) => {
        res.render('index')
    })

//Funções
    const insertUser = async (objUser) =>{
        const daoUser = require('./controller/UserDAO')
        await daoUser.insertUser(objUser)
    }

app.listen(port, () => {
    console.log("Servidor rodando!")
})