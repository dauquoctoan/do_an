import { Router } from 'express'
import adminController from '../../Controllers/adminController'
import authController from '../../Controllers/authController'
import lessonController from '../../Controllers/lessonController'
import { middleAuthenTication, validate } from '../../middleware'
import {
    JChangeStatusAUser,
    JCreateAUser,
    JCreateCourse,
    JCreateEventNews,
    JCreateLesson,
    JCreatePart,
    JCreateTopic,
    JDelete,
    JLoginAdmin,
    JUpdateAUser,
    JUpdateCourse,
    JUpdateEventNews,
    JUpdateLesson,
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
router.put('/lesson', validate(JUpdateLesson), lessonController.upadateLesson)
router.delete('/lesson', validate(JDelete), lessonController.deleteLesson)

/* part */
router.get('/parts', lessonController.getParts)
router.post('/part', validate(JCreatePart), lessonController.createPart)
router.put('/part', validate(JUpdatePart), lessonController.updatePart)
router.delete('/part', validate(JDelete), lessonController.deletePart)

/* user */
router.get('/users', lessonController.getUsers)

router.get('/a-users', adminController.getAUsers)
router.post('/a-user', validate(JCreateAUser), adminController.createAUser)
router.put('/a-user', validate(JUpdateAUser), adminController.updateAUser)
router.patch(
    '/a-user',
    validate(JChangeStatusAUser),
    adminController.updateAUser
)
router.delete('/a-user', validate(JDelete), adminController.deleteAUser)

/* age group */
router.get('/age-groups', lessonController.getParts)
router.post('/age-group', validate(JCreatePart), lessonController.createPart)
router.put('/age-group', validate(JUpdatePart), lessonController.updatePart)
router.delete('/age-group', validate(JDelete), lessonController.deletePart)


router.get('/event-news', lessonController.getEventNews)
router.post('/event-news', validate(JCreateEventNews), lessonController.createEventNews)
router.put('/event-news', validate(JUpdateEventNews), lessonController.updateEventNews)
router.delete('/event-news', validate(JDelete), lessonController.deleteEventNews)

/* age course */
router.get('/courses', lessonController.getCourses)
router.post('/course', validate(JCreateCourse), lessonController.createCourse)
router.put('/course', validate(JUpdateCourse), lessonController.updateCourse)
router.delete('/course', validate(JDelete), lessonController.deleteCourse)

/* age course */
router.get('/homes', lessonController.getHome)


export default router
