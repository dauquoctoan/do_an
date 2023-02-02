import { handleResultError } from '../utils'
const User = require('../models/User')
import jwt_decode from 'jwt-decode'
import AdminUser from '../models/AdminUser'
import { _Find } from '../service'
var multer = require('multer')

export async function middleAuthenTication(req: any, res: any, next: any) {
    const token = req?.headers?.authorization
    if (token) {
        try {
            var result: any = jwt_decode(token)
            let info = result.isLoginAdmin
                ? await AdminUser.findOne({ _id: result?.id })
                : await User.findOne({ email: result.email })
            if (info) {
                req.id = info._id
                return next()
            } else {
                res.status(400).json(
                    handleResultError('Tài khoản không tồn tại')
                )
            }
        } catch (error) {
            return res.status(400).json(handleResultError('Lỗi xác thực'))
        }
    } else {
        return res.status(400).json(handleResultError('Vui lòng đăng nhập'))
    }
    next()
}

export async function middleAuthenTicationSocket(socket: any, next: any) {
    const token = socket.request.headers.authorization
    if (token) {
        try {
            var result: any = jwt_decode(token)
            let info = result.isLoginAdmin
                ? await AdminUser.findOne({ _id: result?.id })
                : await _Find(User, { email: result.email }, 'user', false)
            if (info) {
                return next()
            } else {
                next(new Error('Socket authentication error'))
            }
        } catch (error) {
            return next(new Error('Socket authentication error'))
        }
    } else {
        return next(new Error('Socket authentication error'))
    }
}

export const validate = (schema: any) => (req: any, res: any, next: any) => {
    const { error } = schema.validate(req.body)
    if (error) {
        res.status(422).json(handleResultError(error.details[0].message))
    } else {
        next()
    }
}

const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, 'uploads')
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    },
})

export const middleUpload = multer({ storage: storage })
