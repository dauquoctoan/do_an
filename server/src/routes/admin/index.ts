import { Router } from 'express'
import adminController from '../../Controllers/adminController'
import lessonController from '../../Controllers/lessonController'
import { middleAuthenTication, validate } from '../../middleware'
import { JCreateCard } from '../../validation'
const router = Router()

router.get('/', (req, res, next) => {
    res.send('admin')
})

router.get('/card', validate(JCreateCard), lessonController.createCard)
router.post('/cards', validate(JCreateCard), lessonController.createCard)
router.put('/card', validate(JCreateCard), lessonController.createCard)
router.delete('/card', validate(JCreateCard), lessonController.createCard)

export default router
