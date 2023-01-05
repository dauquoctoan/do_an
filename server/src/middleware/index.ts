import { STATUS_CODE } from '../configs/constans'
import { handleResult } from '../utils'
const User = require('../models/user')

import jwt_decode from 'jwt-decode'

export async function middleAuthenTication(req: any, res: any, next: any) {
    try {
        const token = req.headers.authorization
        if (token) {
            var result: any = jwt_decode(req.headers.authorization)
            const info = await User.find({ email: result.email })
            if (info) {
                req.id = info.id
                return next()
            } else {
                res.status(STATUS_CODE.proxyAuthenticationRequired).json(
                    handleResult('Tài khoản không tồn tại', [], 0)
                )
            }
        } else {
            return res
                .status(STATUS_CODE.proxyAuthenticationRequired)
                .json(handleResult('Vui lòng đăng nhập', [], 0))
        }
    } catch (error) {
        return res
            .status(STATUS_CODE.proxyAuthenticationRequired)
            .json(handleResult('Lỗi xác thực', [], 0))
    }
}
