import {
    handleResultSuccessNoPage,
    handleResultError,
    createMessage,
    handleResultSuccess,
} from '../utils'
import argon2 from 'argon2'
import jwt_decode from 'jwt-decode'
import { STATUS_CODE } from '../configs/constants'
import { _Create } from '../service'
import { IUser } from '../interfaces/user'
import AdminUser from '../models/AdminUser'
import User from '../models/User'
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
                    .json(handleResultError('Vui lòng đăng ký tài khoản!'))
            }
        } else {
            return res.json(handleResultError('Lỗi đăn ký tài khoản!'))
        }
    }
    async saveUser(req: any, res: any) {
        const { name, email, password, age }: IUser = req.body
        const hashPw = await argon2.hash(password || '')
        const data = {
            age: age,
            name: name,
            email: email,
            typeAccount: 0,
            password: hashPw,
        }
        const result = await _Create(User, { email: email }, 'người dùng', data)
        res.json(result)
    }
    async login(req: any, res: any) {
        const { email, password } = req.body
        try {
            const info: any = await User.findOne({ email: email })
            if (
                info._id &&
                (await argon2.verify(info?.password, password)) &&
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
                    point: info.point,
                }

                return res.json(
                    handleResultSuccessNoPage(
                        createMessage.loginSuccess('tài khoản'),
                        user
                    )
                )
            } else {
                return res.json(
                    handleResultError(createMessage.loginFail('tài khoản'))
                )
            }
        } catch (error) {
            return res
                .status(STATUS_CODE.proxyAuthenticationRequired)
                .json(handleResultError(createMessage.loginFail('tài khoản')))
        }
    }
    async loginAdmin(req: any, res: any) {
        const { username, password } = req.body
        try {
            const info: any = await AdminUser.findOne({ name: username })
            if (info._id && (await argon2.verify(info?.password, password))) {
                const token = jwt.sign(
                    {
                        id: info._id,
                        name: info.name,
                        role: info.role,
                        isLoginAdmin: true,
                    },
                    process.env.JWT_PRIVATE_KEY
                )
                return res.json(
                    handleResultSuccessNoPage(
                        createMessage.loginSuccess('tài khoản'),
                        { ...info._doc, token: token }
                    )
                )
            } else {
                return res.json(
                    handleResultError('Tên tài khoản hặc mật khẩu không đúng!')
                )
            }
        } catch (error) {
            return res.json(
                handleResultError('Tên tài khoản hặc mật khẩu không đúng!')
            )
        }
    }
    async loginToken(req: any, res: any) {
        const token = req.body.token
        if (token) {
            try {
                const user: any = jwt_decode(token)
                const info: any = await User.findOne({ email: user.email })
                const info_token = jwt.sign(
                    {
                        id: info._id,
                        name: info.name,
                        email: info.email,
                        point: info?.point || 0,
                    },
                    process.env.JWT_PRIVATE_KEY
                )
                return res.status(200).json(
                    handleResultSuccessNoPage('login thành công', {
                        id: info._id,
                        name: info.name,
                        email: info.email,
                        picture: info.picture,
                        token: info_token,
                        point: info?.point || 0,
                    })
                )
            } catch (error) {
                return res
                    .status(400)
                    .json(handleResultError('Vui lòng đăng ký tài khoản!'))
            }
        } else {
            return res.status(400).json(handleResultError('Lỗi đăng nhập'))
        }
    }
}

export default new authController()
