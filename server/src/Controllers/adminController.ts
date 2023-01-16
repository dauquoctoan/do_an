import { _Finds } from '../service'

import User from '../models/User'
class adminController {
    async Users(req: any, res: any) {
        const users = await _Finds(User, {}, 'user', {
            index: Number(req.query.index),
            limit: Number(req.query.limit),
        })
        res.send(users)
    }

    async CreateUser(req: any, res: any) {
        const body = req.body
    }
}
export default new adminController()
