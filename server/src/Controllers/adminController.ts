import { STATUS_CODES } from 'http'
import { STATUS_CODE } from '../configs/constants'
import { _Find, _Finds } from '../service'

import User from '../models/User'
class adminController {
    async Users(req: any, res: any) {
        const users = await _Finds(User, {}, req.body, 'user')
        res.send(users)
    }

    async CreateUser(req: any, res: any) {
        const body = req.body
    }
}

export default new adminController()
