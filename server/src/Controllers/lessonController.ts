import Card from '../models/Card'
import topic from '../models/Topic'
import { _Create, _Creates, _FindByIdAndDelete, _Finds } from '../service'
import { handleSearchMongoose } from '../utils'

class lessonController {
    async createCard(req: any, res: any) {
        const result = await _Creates(Card, 'card', req.body)
        res.json(result)
    }

    //topic
    async getTopics(req: any, res: any) {
        const result = await _Finds(
            topic,
            handleSearchMongoose('name', req.query.search || ''),
            req.query,
            'topic'
        )
        res.json(result)
    }

    async createTopic(req: any, res: any) {
        const result = await _Creates(topic, 'topic', req.body)
        res.json(result)
    }

    async deleteTopic(req: any, res: any) {
        const result = await _FindByIdAndDelete(topic, req?.body, 'topic')
        res.json(result)
    }
}

export default new lessonController()
