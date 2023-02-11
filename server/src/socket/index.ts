function createSocket(io: any) {
    const users: any = {}
    io.on('connection', (socket: any) => {
        const req = socket.request

        /* message */
        socket.on('join_room', (room: any) => {
            socket.join(room)
            console.log(
                `User with ID: ${socket.id} joined room: ${typeof room}`
            )
        })

        socket.on('send_message', (data: any) => {
            socket.to(data.room).emit('receive_message', data)
        })

        /* gửi yêu cầu lên server chuyển cho người dùng b */
        socket.on('invite_to_the_match', (data: any) => {
            socket.to(data.my_id).emit('res_invite_to_the_match', data)
        })

        /*b gửi phản hồi khi chấp nhận */
        socket.on('accept_the_competition', (data: any) => {
            socket.to(data.room).emit('res_accept_the_competition', data)
        })
        /*gửi data cho thằng được mời*/
        socket.on('sen_lesson', (data: any) => {
            socket.to(data.room).emit('res_sen_lesson', data)
        })

        socket.on('user_connected', (user_id: string) => {
            users[user_id] = req.session.id
            req.session.user_id = user_id
            req.session.save()
            io.sockets.emit('update_user_connected', users)
        })

        socket.on('disconnect', () => {
            delete users[req.session.user_id]
            socket.broadcast.emit('update_user_connected', users)
            console.log('User Disconnected', req.session.user_id)
        })
    })
}
export default createSocket
