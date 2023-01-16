import { Router } from 'express'
import adminController from '../../Controllers/adminController'
import lessonController from '../../Controllers/lessonController'
import { middleAuthenTication, validate } from '../../middleware'
import { JCreateLesson, JCreateTopic, JDeleteTopic } from '../../validation'
const router = Router()

router.get('/topics', lessonController.getTopics)
router.post('/topic', validate(JCreateTopic), lessonController.createTopic)
router.put('/topic', lessonController.updateTopic)
router.delete('/topic', validate(JDeleteTopic), lessonController.deleteTopic)
router.post('/lesson', validate(JCreateLesson), lessonController.createLesson)

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
