import "./App.css";
import Routing from "./routes";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInfo, setListOnline } from "./store/features/info/infoSlice";
import { RootState } from "./store";
import ApiClient from "./services";
import useSelection from "antd/lib/table/hooks/useSelection";
import { setInfoRoom, setJoinRoom } from "./store/features/game";
import { Navigate, useNavigate } from "react-router-dom";
import { history } from "./utils/history";
import { setData } from "./store/features/learn/learnSlice";

function App() {
    const dispatch = useDispatch();
    const socket = useSelector((e: RootState) => {
        return e.socket.socket;
    });

    const info = useSelector((e: RootState) => {
        return e.info;
    });
    const room = useSelector((e: RootState) => {
        return e.infoRoomSlice;
    });
    console.log(room);

    async function getUserInfo() {
        const res = await ApiClient.get("/site/get-info", {
            token: localStorage.getItem("token"),
        });

        dispatch(setInfo(res.data));
    }

    useEffect(() => {
        socket.on("update_user_connected", (data: any) => {
            console.log(data);
            dispatch(setListOnline(data));
        });
        /* server gửi thông tin lời mời từ thằng khác */
        socket.on("res_invite_to_the_match", (data: any) => {
            dispatch(
                setJoinRoom({
                    isModal: true,
                    infoRoom: {
                        id_room_game: data.id_room_game,
                        id_friend: data.id_friend,
                        name_friend: data.name_friend,
                    },
                })
            );
        });

        socket.on("res_sen_lesson", (res: any) => {
            console.log("data", res.data);
            dispatch(setData(res.data));
        });

        socket.on("res_accept_the_competition", async (data: any) => {
            dispatch(
                setInfoRoom({
                    id_room_game: data.id_room_game,
                    id_friend: data.id_friend,
                    name_friend: data.name_friend,
                })
            );
            history.push("/lesson?type=1");
        });
    }, [socket]);

    useEffect(() => {
        if (info.id) {
            socket.emit("user_connected", info.id);
            socket.emit("join_room", info.id);
        }
    }, [info.id]);

    console.log(info);

    useEffect(() => {
        getUserInfo();
    }, []);
    return <Routing />;
}

export default App;
