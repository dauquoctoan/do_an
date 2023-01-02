var express = require('express')
require('dotenv').config()
var session = require('express-session')
const cors = require('cors')
const User = require('./src/models/User')
import router from './src/routes'
import db from './src/configs/db/index'
import authController from './src/Controllers/authController'
var cookieParser = require('cookie-parser')
const passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy

const port = process.env.SERVER_PORT
const app = express()

app.use(cors())
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

passport.serializeUser((user: any, done: any) => {
    console.log(user)
    done(null, user.id)
})

passport.deserializeUser((id: any, done: any) => {
    User.findById(id).then((user: any) => {
        done(null, user)
    })
})

app.use(passport.initialize())
app.use(passport.session())

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
            scope: ['profile'],
        },
        authController.saveUser
    )
)

router(app)
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
