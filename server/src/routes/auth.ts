import { Router } from 'express'
import Joi from 'joi'
import authController from '../Controllers/authController'
import { validate } from '../middleware'
import { JCreateUser, JCreateUserWithToken, JLoginAdmin } from '../validation'
const router = Router()

router.post(
    '/save-user-with-token',
    validate(JCreateUserWithToken),
    authController.saveUserWithToken
)
router.post('/save-user', validate(JCreateUser), authController.saveUser)
router.post('/login', authController.login)
router.post('/login-token', authController.loginToken)
router.post('/admin/login', validate(JLoginAdmin), authController.loginAdmin)

export default router
