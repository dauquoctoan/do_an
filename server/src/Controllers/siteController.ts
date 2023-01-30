import Lesson from '../models/Lesson'
import { _FindsRandom } from '../service'
import { handleSearchMongoose } from '../utils'

const User = require('../models/User')
class siteController {
    async home(req: any, res: any, next: any) {
        res.send('có cái nịt')
    }

    async randomLesson(req: any, res: any, next: any) {
        const result = await _FindsRandom(Lesson, req.query, 'chủ đề', {
            path: 'part',
            populate: {
                path: 'topic',
            },
        })
        res.json(result)
    }
}

export default new siteController()
