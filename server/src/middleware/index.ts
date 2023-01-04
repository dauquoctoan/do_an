import { STATUS_CODE } from '../configs/constans'
import { handleResult } from '../utils'

const jwt = require('jsonwebtoken')

export function middleAuthenTication(req: any, res: any, next: any) {
    res.status(STATUS_CODE.proxyAuthenticationRequired).json(
        handleResult('Vui lòng đăng nhập', [], 0)
    )
}
