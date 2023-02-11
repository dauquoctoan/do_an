import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import Avatar from "@mui/material/Avatar";
import InfoIcon from "@mui/icons-material/Info";
import { COLOR } from "../../../constant";
import { v4 as uuidv4 } from "uuid";
import { setIdRoomLearn } from "../../../store/features/info/infoSlice";

const Info = () => {
    const dispatch = useDispatch();
    const info = useSelector((e: RootState) => {
        return e.info;
    });

    const socket = useSelector((e: RootState) => {
        return e.socket.socket;
    });

    return (
        <SInfo className="body">
            <div className="avatar">
                <Avatar
                    alt="avatar"
                    src={info.picture}
                    sx={{ width: 100, height: 100 }}
                />
                <div className="more">...</div>
            </div>
            <div className="content">
                <div>
                    <h3>Danh sách bạn bè</h3>
                    {info.listFriends.length > 0 &&
                        info.listFriends.map((item, index) => {
                            return (
                                <div className="item">
                                    <div className="left">
                                        <Avatar
                                            sx={{ width: 40, height: 40 }}
                                            src={item.picture}
                                            alt="avatar"
                                        />
                                        <div
                                            className={
                                                info.listOnline[item._id]
                                                    ? "online active"
                                                    : "online"
                                            }
                                        ></div>
                                        <div className="name">{item.name}</div>
                                    </div>
                                    <InfoIcon
                                        onClick={async () => {
                                            const id = uuidv4();
                                            await socket.emit(
                                                "invite_to_the_match",
                                                {
                                                    my_id: item._id,
                                                    id_room_game: id,
                                                    name_friend: info.name,
                                                    id_friend: info.id,
                                                }
                                            );
                                            dispatch(setIdRoomLearn(id));
                                        }}
                                        className="icons"
                                    />
                                </div>
                            );
                        })}
                </div>
                <div>
                    <h3>Danh sách khóa học</h3>
                    {info.listCourse.length > 0 &&
                        info.listCourse.map((e) => {
                            return (
                                <div>
                                    <div>{e.title}</div>
                                    <div>{e.desc}</div>
                                    <div>{e.picture}</div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </SInfo>
    );
};

export default Info;

const SInfo = styled.div`
    .avatar {
        height: 200px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-items: flex-start;
        flex-direction: column;
        .more {
            cursor: pointer;
        }
        border-bottom: 1px solid ${COLOR.colors.border_color};
    }
    .content {
        display: flex;
    }
    .content > div {
        flex: 1;
    }
    .content .item {
        .left {
            display: flex;
            justify-content: space-between;
            justify-items: center;
            align-items: center;
            .online {
                position: absolute;
                width: 20px;
                height: 20px;
                background-color: gray;
                border-radius: 50%;
                top: 32px;
                left: 41px;
            }
            .active {
                background-color: green;
            }
            .name {
                margin-left: 10px;
                font-size: 14px;
                font-weight: 700;
            }
        }
        display: flex;
        padding: 10px 35px 10px 20px;
        justify-content: space-between;
        justify-items: center;
        align-items: center;
        position: relative;
        .icons {
            cursor: pointer;
        }
    }
`;
