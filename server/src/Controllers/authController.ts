import {
    handleResultSuccessNoPage,
    handleResultError,
    createMessage,
} from '../utils'
import argon2 from 'argon2'
import User from '../models/User'
import jwt_decode from 'jwt-decode'
import { STATUS_CODE } from '../configs/constants'
import { _Create } from '../service'
import { IUser } from '../interfaces/user'
var jwt = require('jsonwebtoken')

class authController {
    async saveUserWithToken(req: any, res: any) {
        const token = req.body.token
        if (token) {
            try {
                const user: any = jwt_decode(token)
                const data = {
                    name: user.name,
                    email: user.email,
                    email_verified: user.email_verified,
                    exp: user.exp,
                    givenName: user.givenName,
                    iat: user.iat,
                    picture: user.picture,
                    typeAccount: 1,
                    passWord: user.passWord,
                }
                const result = await _Create(
                    User,
                    { email: data.email },
                    'User',
                    data
                )
                return res.status(200).json(result)
            } catch (error) {
                return res
                    .status(STATUS_CODE.proxyAuthenticationRequired)
                    .json(handleResultError('Vui lòng đăng nhập'))
            }
        } else {
            return res.json(handleResultError('Lỗi đăng nhập'))
        }
    }
    async saveUser(req: any, res: any) {
        const { name, email, password }: IUser = req.body

        const hashPw = await argon2.hash(password || '')

        const data = {
            name: name,
            email: email,
            typeAccount: 0,
            password: hashPw,
        }

        const result = await _Create(User, { email: email }, 'người dùng', data)
        res.json(result)
    }
    async login(req: any, res: any) {
        const { email, passWord } = req.body
        try {
            const info: any = await User.findOne({ email: email })
            if (
                info._id &&
                (await argon2.verify(info?.passWord, passWord)) &&
                info?.typeAccount === 0
            ) {
                const token = jwt.sign(
                    { id: info._id, email: info.email },
                    process.env.JWT_PRIVATE_KEY
                )

                const user = {
                    id: info._id,
                    email: info.email,
                    name: info.name,
                    token: token,
                }
                return res
                    .status(STATUS_CODE.OK)
                    .json(
                        handleResultSuccessNoPage(
                            createMessage.loginSuccess('tài khoản'),
                            user
                        )
                    )
            } else {
                return res
                    .status(STATUS_CODE.proxyAuthenticationRequired)
                    .json(
                        handleResultError(createMessage.loginFail('tài khoản'))
                    )
            }
        } catch (error) {
            return res
                .status(STATUS_CODE.proxyAuthenticationRequired)
                .json(handleResultError(createMessage.loginFail('tài khoản')))
        }
    }
}

export default new authController()
