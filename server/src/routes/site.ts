import { Router } from 'express'
import siteController from '../Controllers/siteController'
import { middleAuthenTication } from '../middleware'
const router = Router()

router.get('/', middleAuthenTication, siteController.home)

export default router
