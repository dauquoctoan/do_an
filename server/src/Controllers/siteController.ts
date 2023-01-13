const User = require('../models/User')
const Joi = require('joi')
var createError = require('http-errors')

class siteController {
    async home(req: any, res: any, next: any) {
        res.send()
    }
}

export default new siteController()
