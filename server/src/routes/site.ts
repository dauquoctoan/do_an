import { Router } from 'express'
import Joi from 'Joi'
import siteController from '../Controllers/siteController'
import { middleAuthenTication, validate } from '../middleware'
const router = Router()

router.post('/', siteController.home)

export default router
