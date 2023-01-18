var express = require('express')
const path = require('path')
require('dotenv').config()
var session = require('express-session')
const cors = require('cors')
import router from './src/routes'
import db from './src/configs/db/index'
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const port = process.env.SERVER_PORT
const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, '/uploads')))
db.connect()
app.use(cookieParser())
app.set('trust proxy', 1)
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: false,
            maxAge: 20 * 60 * 1000,
        },
    })
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))
router(app)
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
