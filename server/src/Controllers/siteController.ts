const User = require('../models/User')
class siteController {
    async home(req: any, res: any, next: any) {
        const proxyHost = req.headers['x-forwarded-host']
        const host = proxyHost ? proxyHost : req.headers.host

        res.send(host)
    }
}

export default new siteController()
