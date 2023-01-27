import { Router } from 'express'
import siteController from '../../Controllers/siteController'
import { middleAuthenTication, validate } from '../../middleware'
const router = Router()
router.get('/', middleAuthenTication)
router.post('/', siteController.home)

export default router
