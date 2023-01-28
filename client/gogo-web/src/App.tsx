import './App.css'
import CreateGlobalStyle from './global-styled'
import Navigation from './navigation'
import { useSelector } from 'react-redux'
import type { RootState } from './store/store'
import Cookie from 'js-cookie'
import Configs from './configs'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

function App() {
  const data: any = useSelector((store: RootState) => store.authReducer)
  const history = useHistory()
  const location = useLocation()

  React.useLayoutEffect(() => {
    const token = localStorage.getItem(Configs._token)
    if (!token) {
      history.push('/login')
    }
  }, [])

  return (
    <div className="App">
      <Navigation />
      <CreateGlobalStyle />
    </div>
  )
}

export default App
// import './App.css'
// import io from 'socket.io-client'
// import { useState } from 'react'
// import Chat from './Chat'

// const socket = io('http://localhost:3005')

// function App() {
//   const [username, setUsername] = useState('')
//   const [room, setRoom] = useState('')
//   const [showChat, setShowChat] = useState(false)

//   const joinRoom = () => {
//     if (username !== '' && room !== '') {
//       socket.emit('join_room', room)
//       setShowChat(true)
//     }
//   }

//   return (
//     <div className="App">
//       {!showChat ? (
//         <div className="joinChatContainer">
//           <h3>Join A Chat</h3>
//           <input
//             type="text"
//             placeholder="John..."
//             onChange={(event) => {
//               setUsername(event.target.value)
//             }}
//           />
//           <input
//             type="text"
//             placeholder="Room ID..."
//             onChange={(event) => {
//               setRoom(event.target.value)
//             }}
//           />
//           <button onClick={joinRoom}>Join A Room</button>
//         </div>
//       ) : (
//         <Chat socket={socket} username={username} room={room} />
//       )}
//     </div>
//   )
// }

// export default App
