import { STATUS_CODES } from 'http'
import { STATUS_CODE } from '../configs/constans'
import { handleResult, Mfind, Mfinds } from '../utils'

const User = require('../models/User')
class adminController {
    async Users(req: any, res: any) {
        const users = await Mfinds(User, {}, req.query)
        res.send(users)
    }
}
export default new adminController()
