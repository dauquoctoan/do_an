import { STATUS_CODE } from '../configs/constans'
import { handleResultError } from '../utils'
const User = require('../models/User')
import jwt_decode from 'jwt-decode'

export async function middleAuthenTication(req: any, res: any, next: any) {
    try {
        const token = req.headers.authorization
        if (token) {
            var result: any = jwt_decode(req.headers.authorization)
            const info = await User.findOne({ email: result.email })
            if (info) {
                req.id = info._id
                return next()
            } else {
                res.status(STATUS_CODE.proxyAuthenticationRequired).json(
                    handleResultError('Tài khoản không tồn tại')
                )
            }
        } else {
            return res
                .status(STATUS_CODE.proxyAuthenticationRequired)
                .json(handleResultError('Vui lòng đăng nhập'))
        }
    } catch (error) {
        return res
            .status(STATUS_CODE.proxyAuthenticationRequired)
            .json(handleResultError('Lỗi xác thực'))
    }
}

export const validate = (schema: any) => (req: any, res: any, next: any) => {
    const { error } = schema.validate(req.body)
    if (error) {
        res.status(422).send(error.details[0].message)
    } else {
        next()
    }
}
