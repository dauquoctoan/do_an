import { IUser } from '../models/user'
import { MCreate } from '../utils'

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
    async saveUserWithToken(req: any, res: any) {
        const {
            name,
            email,
            email_verified,
            exp,
            givenName,
            iat,
            picture,
            typeAccount,
        }: IUser = req.body

        const data = {
            name: name,
            email: email,
            email_verified: email_verified,
            exp: exp,
            givenName: givenName,
            iat: iat,
            picture: picture,
            typeAccount: typeAccount,
        }

        const result = await MCreate(User, { email: email }, 'User', data)

        res.send(result)
    }
}

export default new authController()
