var express = require('express')
const path = require('path')
require('dotenv').config()
var session = require('express-session')
const cors = require('cors')
import router from './src/routes'
import db from './src/configs/db/index'
import createSocket from './src/socket'
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
import * as http from 'http'
import { Server } from 'socket.io'
import { middleAuthenTicationSocket } from './src/middleware'
const port = process.env.SERVER_PORT
const app = express()

const httpServer = new http.Server(app)

const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:3006'],
        credentials: true,
    },
})

app.set('socketIo', io)
// io.attach(httpServer, {
//     pingInterval: 5000, // 5s - đơn vị miliseconds 1000ms = 1s
//     pingTimeout: 20000, // 20s - đơn vị miliseconds 1000ms = 1s
//     cookie: false,
// })
io.use(middleAuthenTicationSocket)

db.connect()
app.use(cors())
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

// const server = http.createServer(app)
createSocket(io)

httpServer.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
