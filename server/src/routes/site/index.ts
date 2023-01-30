import { Router } from 'express'
import lessonController from '../../Controllers/lessonController'
import siteController from '../../Controllers/siteController'

const router = Router()
router.get('/', siteController.home)

router.get('/topics', lessonController.getTopics)
router.get('/parts', lessonController.getParts)
router.get('/lessons', lessonController.getLesson)

export default router
