const User = require('../models/User')
import { Mfind, Mfinds } from '../utils'

class siteController {
    async home(req: any, res: any) {
        const result = await User.find()
            .then((e: any) => {
                res.send(e)
            })
            .catch(() => {
                res.send('error')
            })
    }
}
export default new siteController()
