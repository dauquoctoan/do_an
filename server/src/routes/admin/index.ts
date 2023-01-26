import { Router } from 'express'
import adminController from '../../Controllers/adminController'
import lessonController from '../../Controllers/lessonController'
import { middleAuthenTication, validate } from '../../middleware'
import {
    JCreateLesson,
    JCreatePart,
    JCreateTopic,
    JDelete,
    JUpdatePart,
} from '../../validation'
const router = Router()

/* topic */
router.get('/topics', lessonController.getTopics)
router.post('/topic', validate(JCreateTopic), lessonController.createTopic)
router.put('/topic', validate(JCreateTopic), lessonController.updateTopic)
router.delete('/topic', validate(JDelete), lessonController.deleteTopic)

/* lesson */
router.get('/lessons', lessonController.getLesson)
router.post('/lesson', validate(JCreateLesson), lessonController.createLesson)
router.put('/lesson', validate(JCreateLesson), lessonController.upadateLesson)
router.delete('/lesson', validate(JDelete), lessonController.deleteLesson)

/* part */
router.get('/parts', lessonController.getParts)
router.post('/part', validate(JCreatePart), lessonController.createPart)
router.put('/part', validate(JUpdatePart), lessonController.upadatePart)
router.delete('/part', validate(JDelete), lessonController.deletePart)

/* user */
router.get('/users', lessonController.getUsers)

export default router
