import Lesson from '../models/Lesson'
import Card from '../models/Lesson'
import Topic from '../models/Topic'
import Part from '../models/Part'
import EventNews from '../models/EventNews'


import {
    _Create,
    _Creates,
    _FindByIdAndDelete,
    _FindByIdAndUpdate,
    _Finds,
    _FindsRandom,
} from '../service'
import { handleSearchMongoose } from '../utils'
import User from '../models/User'

class lessonController {
    async createCard(req: any, res: any) {
        const result = await _Creates(Card, req.body, 'card')
        res.json(result)
    }

    //topic
    async getTopics(req: any, res: any) {
        const result = await _Finds(
            Topic,
            {
                ...handleSearchMongoose('name', req.query.search || ''),
                ...req.query,
            },
            'topic'
        )
        res.json(result)
    }

    async createTopic(req: any, res: any) {
        const result = await _Creates(Topic, req.body, 'chủ đề')
        res.json(result)
    }

    async updateTopic(req: any, res: any) {
        const result = await _FindByIdAndUpdate(Topic, req.body, 'chủ đề')
        res.json(result)
    }

    async deleteTopic(req: any, res: any) {
        const result = await _FindByIdAndDelete(Topic, req?.body, 'chủ đề')
        res.json(result)
    }

    async createLesson(req: any, res: any) {
        const result = await _Creates(Lesson, req?.body, 'bài tập')
        res.json(result)
    }

    async upadateLesson(req: any, res: any) {
        const result = await _FindByIdAndUpdate(Lesson, req?.body, 'bài tập')
        res.json(result)
    }

    async deleteLesson(req: any, res: any) {
        const result = await _FindByIdAndDelete(Lesson, req?.body, 'bài tập')
        res.json(result)
    }

    async getLesson(req: any, res: any) {
        const result = await _Finds(
            Lesson,
            {
                ...handleSearchMongoose('title', req.query.search || ''),
                ...req.query,
            },
            'chủ đề',
            {
                path: 'part',
                populate: {
                    path: 'topic',
                },
            }
        )
        res.json(result)
    }
    
    async getRandom(req: any, res: any) {
        const result = await _FindsRandom(Lesson, req.query, 'chủ đề', {
            path: 'part',
            populate: {
                path: 'topic',
            },
        })
        res.json(result)
    }

    async getParts(req: any, res: any) {
        const result = await _Finds(
            Part,
            {
                ...handleSearchMongoose('title', req.query.search || ''),
                ...req.query,
            },
            'học phần',
            'topic'
        )
        res.json(result)
    }

    async createPart(req: any, res: any) {
        const result = await _Creates(Part, req?.body, 'học phần')
        res.json(result)
    }

    async updatePart(req: any, res: any) {
        const result = await _FindByIdAndUpdate(Part, req?.body, 'học phần')
        res.json(result)
    }

    async deletePart(req: any, res: any) {
        const result = await _FindByIdAndDelete(Part, req?.body, 'học phần')
        res.json(result)
    }
    /* user */
    async getUsers(req: any, res: any) {
        const result = await _Finds(
            User,
            {
                ...handleSearchMongoose('name', req.query.search || ''),
                ...req.query,
            },
            'Người dùng'
        )
        res.json(result)
    }

    async createEventNews(req: any, res: any) {
        const result = await _Creates(EventNews, req?.body, 'tin tức sự kiện')
        res.json(result)
    }

    async updateEventNews(req: any, res: any) {
        const result = await _FindByIdAndUpdate(EventNews, req?.body, 'tin tức sự kiện')
        res.json(result)
    }

    async deleteEventNews(req: any, res: any) {
        const result = await _FindByIdAndDelete(EventNews, req?.body, 'tin tức sự kiện')
        res.json(result)
    }
    /* user */
    async getEventNews(req: any, res: any) {
        const result = await _Finds(
            EventNews,
            {
                ...handleSearchMongoose('title', req.query.search || ''),
                ...req.query,
            },
            'tin tức sự kiện'
        )
        res.json(result)
    }

}

export default new lessonController()
