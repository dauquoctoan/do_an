const User = require('../models/User')
class siteController {
    async home(req: any, res: any, next: any) {
        res.send('có cái nịt')
    }
}

export default new siteController()
