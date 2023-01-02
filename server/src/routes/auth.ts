import { Router } from 'express'
import authController from '../Controllers/authController'
const router = Router()
const passport = require('passport')

router.get('/google', passport.authenticate('google'))

router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/error',
        session: false,
    }),
    authController.authGoogleSS
)

router.get('/logout', function (req: any, res, next) {
    req.logout(function (err: any) {
        if (err) {
            return next(err)
        }
        res.redirect('/')
    })
})

export default router
