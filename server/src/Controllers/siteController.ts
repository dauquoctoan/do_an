import Lesson from '../models/Lesson'
import { _FindsRandom } from '../service'
import { handleSearchMongoose } from '../utils'

const User = require('../models/User')
class siteController {
    async home(req: any, res: any, next: any) {
        // console.log('req.app.socketIo', req.app.socketIo)
        const socket = req.app.get('socketIo')
        await socket.to('123').emit('receive_message', {
            room: '123',
            author: 'ngu',
            message: 'lol',
            time:
                new Date(Date.now()).getHours() +
                ':' +
                new Date(Date.now()).getMinutes(),
        })
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
