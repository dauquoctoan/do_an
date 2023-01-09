import { IUser } from '../models/User'
import { handleResultSuccess, handleResultError, createMessage } from '../utils'
const argon2 = require('argon2')
const User = require('../models/User')
import jwt_decode from 'jwt-decode'
import { STATUS_CODE } from '../configs/constans'
import { MCreate } from '../service'
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
                const result = await MCreate(
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
        const { name, email, passWord }: IUser = req.body
        try {
            const hashPw = await argon2.hash(passWord)
            const data = {
                name: name,
                email: email,
                typeAccount: 0,
                passWord: hashPw,
            }

            const result = await MCreate(User, { email: email }, 'User', data)
            res.status(STATUS_CODE.OK).json(result)
        } catch (err) {
            res.status(STATUS_CODE.OK).json(
                handleResultError('Không tạo được user')
            )
        }
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
<<<<<<< HEAD
                return res
                    .status(STATUS_CODE.OK)
                    .json(
                        handleResultSuccess(
                            createMessage.loginSuccess('tài khoản'),
                            user
                        )
                    )
=======
                return res.json(handleResult('Thành công', user, 1))
>>>>>>> 93129bf13d921a2ef4428da53db4d0db7137a260
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
