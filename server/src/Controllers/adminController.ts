import { STATUS_CODES } from 'http'
import { STATUS_CODE } from '../configs/constans'
import { Mfind, Mfinds } from '../service'

const User = require('../models/User')
class adminController {
    async Users(req: any, res: any) {
        const users = await Mfinds(User, {}, 'user', {
            index: Number(req.query.index),
            limit: Number(req.query.limit),
        })
        res.send(users)
    }
}
export default new adminController()
