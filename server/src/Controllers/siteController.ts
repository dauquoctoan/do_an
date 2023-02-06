import Lesson from '../models/Lesson'
import { _Find, _FindByIdAndUpdate, _Finds, _FindsRandom } from '../service'
import { handleSearchMongoose } from '../utils'
import User from '../models/User'
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

    async upDatePoint(req: any, res: any, next: any) {
        const point = req?.body?.type * 100 || 0
        const info = await _Find(User, { _id: req?.body._id }, 'user', false)
        const query: any = {
            _id: req?.body._id,
            point: info?.point + point || 0 + point,
        }
        // console.log(query)
        const socket = req.app.get('socketIo')
        const result = await _FindByIdAndUpdate(User, query, 'điểm')
        await socket.emit('receive_message', {
            room: '123',
            author: 'ngu',
            message: 'lol',
        })
        res.json(result)
    }
    async upDateListCourse(req: any, res: any, next: any) {
        const result = await _FindByIdAndUpdate(User, { ...req.body }, 'khóa học')
        res.json(result)
    }

    async getTop100(req: any, res: any) {
        const result = await _Finds(
            User,
            {
                ...req.query,
            },
            'top 100',
            null,
            true,
            { point: -1 }
        )
        res.json(result)
    }
}

export default new siteController()
