const { Server } = require('socket.io')
function createSocket(server: any) {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
        },
    })

    io.on('connection', (socket: any) => {
        console.log(`User Connected: ${socket.id}`)
        socket.on('join_room', (data: any) => {
            socket.join(data)
            console.log(`User with ID: ${socket.id} joined room: ${data}`)
        })
        socket.on('send_message', (data: any) => {
            socket.to(data.room).emit('receive_message', data)
        })
        socket.on('disconnect', () => {
            console.log('User Disconnected', socket.id)
        })
    })
}
export default createSocket
