var express = require('express')
require('dotenv').config()
var session = require('express-session')
const cors = require('cors')
import { connectDB } from './src/configs/dbConfig'
const User = require('./src/models/User')
import router from './src/routes'
import db from './src/configs/db/index'
const cookieSession = require('cookie-session')
const passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy

const port = process.env.SERVER_PORT
const app = express()
app.use(cors())
//connectDB()
db.connect()

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: ['keys.cookieKey'],
    })
)
app.use(passport.initialize())
app.use(passport.session())

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
        },
        function (accessToken: any, refreshToken: any, profile: any, cb: any) {
            User.create(
                { googleId: profile.id },
                (err: string, user: string) => {
                    return cb(err, user)
                }
            )
        }
    )
)

//router(app)
app.get('/', (req: any, res: any) => {
    res.send('test')
})

app.get('/login', (req: any, res: any) => {
    res.send('login')
})

app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
)

app.get('/auth/google/callback', (req: any, res: any) => {
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
