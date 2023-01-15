import { Router } from 'express'
import adminController from '../../Controllers/adminController'
import lessonController from '../../Controllers/lessonController'
import { middleAuthenTication, validate } from '../../middleware'
import { JCreateCard, JCreateTopic, JDeleteTopic } from '../../validation'
const router = Router()

router.get('/topics', lessonController.getTopics)
router.post('/topic', validate(JCreateTopic), lessonController.createTopic)
router.delete('/topic', validate(JDeleteTopic), lessonController.deleteTopic)

router.post('/card', validate(JCreateCard), lessonController.createCard)

// router.get('/cards', (req, res, next) => {
//     res.send('admin')
// })
// router.put('/card', (req, res, next) => {
//     res.send('admin')
// })
// router.delete('/card', (req, res, next) => {
//     res.send('admin')
// })

export default router
