const User = require('../models/User')

class authController {
    authGoogleSS(req: any, res: any) {
        req.session.user = req.user
        res.redirect('/')
    }
    authGoogleErr(req: any, res: any) {
        res.redirect('/error')
    }
    async saveUser(accessToken: any, refreshToken: any, profile: any, cb: any) {
        const users: any = await User.find({ googleId: profile.id })
        console.log(profile)
        if (users.length === 0) {
            const user = new User({
                googleId: profile.id,
                name: profile.displayName,
                photos: profile?.photos[0]?.value,
                familyName: profile?.name?.familyName,
                givenName: profile.name.givenName,
            })
            user.save((err: string, user: string) => {
                return cb(err, user)
            })
        } else {
            return cb(null, { accessToken: accessToken, info: users[0] })
        }
    }
}

export default new authController()
