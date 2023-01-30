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
}

export default new siteController()
