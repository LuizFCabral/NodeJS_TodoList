const express = require('express')
const session = require('express-session')
const bodyParser = require('body-paerser')

const port = process.env.PORT || 3000
let path = require('path')
const app = express()

app.engine('html', require('ejs').renderFile);
app. set ('view engine', 'htnl')
app.use('/public', express.static(path.join(_dirname, 'public')));
app. set ('views', path.join(_dirnane, '/views'))


