import Lesson from '../models/Lesson'
import { _Find, _FindByIdAndUpdate, _Finds, _FindsRandom } from '../service'
import { handleResultError, handleSearchMongoose } from '../utils'
import User from '../models/User'
import Topic from '../models/Topic'
import jwt_decode from 'jwt-decode'
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
        const result = await _FindByIdAndUpdate(User, query, 'điểm')
        res.json(result)
    }

    async upDatePointWhenUnLock(req: any, res: any) {
        const info = await _Find(User, { _id: req?.body._id }, 'user', false)
        const point = req?.body?.point || 0
        const query: any = {
            _id: req?.body._id,
            point: info?.point - point || 0,
        }
        const result = await _FindByIdAndUpdate(User, query, 'điểm')
        // res.json(result)
        res.send(info)
    }

    async upDateListCourse(req: any, res: any, next: any) {
        const result = await _FindByIdAndUpdate(
            User,
            { _id: req.body._id, $push: { listCourse: req.body.listCourse } },
            'khóa học'
        )
        res.json(result)
    }

    async upDateListFriend(req: any, res: any, next: any) {
        const result = await _FindByIdAndUpdate(
            User,
            { _id: req.body._id, $push: { listFriends: [req?.body?.friend] } },
            'bạn bè'
        )
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

    async unlockTopic(req: any, res: any) {
        const result2 = await _FindByIdAndUpdate(Topic, req.body, 'topic')
        res.json(result2)
    }

    async getInfo(req: any, res: any) {
        var result: any = jwt_decode(req.query.token || '')

        if (!result) {
            res.json(handleResultError('Token không hợp lệ'))
        }
        const result2 = await _Find(User, { _id: result.id }, 'người dùng')
        console.log('=========================================================')
        console.log(result2)
        console.log('=========================================================')
        res.json(result2)
    }
}

export default new siteController()
