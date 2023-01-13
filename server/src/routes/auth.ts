import { Router } from 'express'
import authController from '../Controllers/authController'
import { validate } from '../middleware'
import { JCreateUser } from '../validation'
const router = Router()

router.post('/save-user-with-token', authController.saveUserWithToken)
router.post('/save-user', validate(JCreateUser), authController.saveUser)
router.post('/login', authController.login)

export default router
