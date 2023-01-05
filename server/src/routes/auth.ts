import { Router } from 'express'
import authController from '../Controllers/authController'
const router = Router()

router.post('/save-user-with-token', authController.saveUserWithToken)
router.post('/save-user', authController.saveUser)

export default router
