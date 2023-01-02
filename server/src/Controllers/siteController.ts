const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class siteController {
    home(req: any, res: any) {
        res.send(req.session)
    }
}
export default new siteController()
