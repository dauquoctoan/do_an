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

/* lesson */
router.get('/lessons', lessonController.getLesson)
router.post('/lesson', validate(JCreateLesson), lessonController.createLesson)

export default router
