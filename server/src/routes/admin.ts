import { Router } from 'express'
import adminController from '../Controllers/adminController'
import { middleAuthenTication } from '../middleware'
const router = Router()

router.get('/', (req, res, next) => {
    res.send('admin')
})

router.get('/users', adminController.Users)

export default router
