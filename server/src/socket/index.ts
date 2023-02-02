function createSocket(io: any) {
    io.on('connection', (socket: any) => {
        console.log(`User Connected: ${socket.id}`)
        socket.on('join_room', (room: any) => {
            socket.join('123')
            console.log(
                `User with ID: ${socket.id} joined room: ${typeof room}`
            )
        })
        socket.on('send_message', (data: any) => {
            socket.to('123').emit('receive_message', data)
        })
        socket.on('disconnect', () => {
            console.log('User Disconnected', socket.id)
        })
    })
}
export default createSocket
