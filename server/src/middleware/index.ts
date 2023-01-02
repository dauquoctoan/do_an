const passport = require('passport')

function authGoogleMiddleware() {
    passport.authenticate('google')
}
export default authGoogleMiddleware
