import { IUser } from '../models/user'
import { MCreate } from '../utils'

const User = require('../models/User')
const jwt = require('jsonwebtoken')

class authController {
    async saveUserWithToken(req: any, res: any) {
        const token = req.body.token
        if (token) {
            try {
                const user: any = jwt.verify(token, '')
                const data = {
                    name: user.name,
                    email: user.email,
                    email_verified: user.email_verified,
                    exp: user.exp,
                    givenName: user.givenName,
                    iat: user.iat,
                    picture: user.picture,
                    typeAccount: user.typeAccount,
                    passWord: user.passWord,
                }
                const result = await MCreate(
                    User,
                    { email: data.email },
                    'User',
                    data
                )
                return res.status().json(result)
            } catch (error) {
                return res.json({
                    message: 'Lỗi xác thực',
                    data: [],
                    code: 0,
                })
            }
        } else {
            return res.json({
                message: 'Lỗi xác thực',
                data: [],
                code: 0,
            })
        }
    }
    async saveUser(req: any, res: any) {
        const { name, email, typeAccount, passWord }: IUser = req.body

        const data = {
            name: name,
            email: email,
            typeAccount: typeAccount,
            passWord: passWord,
        }

        const result = await MCreate(User, { email: email }, 'User', data)

        res.send(result)
    }
}

export default new authController()
