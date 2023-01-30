import io from "socket.io-client";
import { useState } from "react";
import Message from "./Message";
import { ChartStyled } from "./styled";

const socket = io("http://localhost:3005", {
    extraHeaders: {
        Authorization: localStorage.getItem("token") || "",
    },
});

function Chat() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    };

    return (
        <ChartStyled className="App">
            {!showChat ? (
                <div className="joinChatContainer">
                    <h3>Join A Chat</h3>
                    <input
                        type="text"
                        placeholder="John..."
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Room ID..."
                        onChange={(event) => {
                            setRoom(event.target.value);
                        }}
                    />
                    <button onClick={joinRoom}>Join A Room</button>
                </div>
            ) : (
                <Message socket={socket} username={username} room={room} />
            )}
        </ChartStyled>
    );
}

export default Chat;
