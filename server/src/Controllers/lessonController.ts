import Lesson from '../models/Lesson'
import Card from '../models/Lesson'
import Topic from '../models/Topic'
import {
    _Create,
    _Creates,
    _FindByIdAndDelete,
    _FindByIdAndUpdate,
    _Finds,
} from '../service'
import { handleSearchMongoose } from '../utils'

class lessonController {
    async createCard(req: any, res: any) {
        const result = await _Creates(Card, req.body, 'card')
        res.json(result)
    }

    //topic
    async getTopics(req: any, res: any) {
        const result = await _Finds(
            Topic,
            handleSearchMongoose('name', req.query.search || ''),
            req.query,
            'topic'
        )
        res.json(result)
    }

    async createTopic(req: any, res: any) {
        const result = await _Creates(Topic, req.body, 'topic')
        res.json(result)
    }
    async updateTopic(req: any, res: any) {
        const result = await _FindByIdAndUpdate(Topic, req.body, 'topic')
        res.json(result)
    }

    async deleteTopic(req: any, res: any) {
        const result = await _FindByIdAndDelete(Topic, req?.body, 'topic')
        res.json(result)
    }

    async createLesson(req: any, res: any) {
        const result = await _Creates(Lesson, req?.body, 'lesson')
        res.json(result)
    }

    async getLesson(req: any, res: any) {
        const result = await _Finds(
            Lesson,
            handleSearchMongoose('title', req.query.search || ''),
            req.query,
            'lesson',
            'topic'
        )
        res.json(result)
    }
}

export default new lessonController()
