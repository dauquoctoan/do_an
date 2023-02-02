import { Router } from 'express'
import lessonController from '../../Controllers/lessonController'
import siteController from '../../Controllers/siteController'
import { validate } from '../../middleware'
import { JUpdatePoint } from '../../validation'

const router = Router()
router.get('/', siteController.home)
router.get('/topics', lessonController.getTopics)
router.get('/parts', lessonController.getParts)
router.get('/lessons', lessonController.getLesson)
router.put('/user', validate(JUpdatePoint), siteController.upDatePoint)
router.get('/random-lessons', lessonController.getRandom)
router.get('/news-event', lessonController.getEventNews)
router.get('/top100', siteController.getTop100)

export default router
