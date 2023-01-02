import { Router } from 'express'
import siteController from '../Controllers/siteController'
const router = Router()

router.get('/', siteController.home)

export default router
