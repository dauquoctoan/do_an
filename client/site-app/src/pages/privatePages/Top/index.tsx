import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import styled from "styled-components";
import { COLOR } from "../../../constant";
import io from "socket.io-client";
import { useState } from "react";
import ApiClient from "../../../services";
import { Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { notify } from "../../../commons/notification";
import { setListFriends } from "../../../store/features/info/infoSlice";

const Top = () => {
    const [tops, setTops] = useState<any>([]);
    const dispatch = useDispatch();
    const info = useSelector((state: RootState) => {
        return state.info;
    });

    async function getData() {
        const res = await ApiClient.get("/site/top100", { limit: 100 });
        setTops(res.data);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <STop>
            <div className="container">
                <h3>Top 100 người có số điểm cao nhất</h3>
                {tops.length > 0 &&
                    tops.map((e: any, index: number) => {
                        return (
                            <div id={`top_${index + 1}`} className={`item`}>
                                <div>
                                    <h5>#{index + 1}</h5>
                                    <p>{e.name}</p>
                                </div>
                                <div>
                                    <div style={{ marginRight: "10px" }}>
                                        {e.point}
                                    </div>
                                    <Popconfirm
                                        title="Bạn có muốn theo dõi người này"
                                        okText="Có"
                                        cancelText="Không"
                                        onConfirm={async () => {
                                            if (e._id !== info.id) {
                                                const user =
                                                    info.listFriends.find(
                                                        (friend) => {
                                                            return (
                                                                friend._id ===
                                                                e._id
                                                            );
                                                        }
                                                    );
                                                if (user) {
                                                    notify.success(
                                                        "Bạn đã là bạn của nhau !"
                                                    );
                                                } else {
                                                    const res =
                                                        await ApiClient.put(
                                                            "/site/update-list-friend",
                                                            {
                                                                _id: info.id,
                                                                friend: {
                                                                    _id: e._id,
                                                                    name: e.name,
                                                                    picture:
                                                                        e.picture,
                                                                },
                                                            }
                                                        );
                                                    if (res) {
                                                        dispatch(
                                                            setListFriends(
                                                                res?.data
                                                                    ?.listFriends
                                                            )
                                                        );
                                                        notify.success(
                                                            "Bạn đã theo dõi thành công người dùng: " +
                                                                e.name
                                                        );
                                                    }
                                                }
                                            } else {
                                                notify.success(
                                                    "Bạn đã là bạn của nhau !"
                                                );
                                            }
                                        }}
                                    >
                                        <Avatar
                                            alt="img"
                                            className="img"
                                            src={e.picture}
                                        />
                                    </Popconfirm>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </STop>
    );
};

export default Top;

const STop = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    margin: auto;
    justify-content: center;
    align-items: center;
    .container {
        width: 60%;
        height: auto;
        margin-top: 20px;
        .item {
            width: 100%;
            padding: 15px 20px;
            border-radius: 15px;
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: ${COLOR.colors.bg_colo_button};
            div {
                display: flex;
                align-items: center;
                justify-content: center;
                p {
                    margin-left: 20px;
                    margin-bottom: 0px;
                }
                h5 {
                    margin-bottom: 0px;
                }
            }
            .img {
                cursor: pointer;
            }
        }
        h3 {
            text-align: center;
        }
        #top_1 {
            background-image: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
        }
        #top_2 {
            background-image: linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%);
        }
        #top_3 {
            background-image: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
        }
        #top_4 {
            background-image: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        #top_5 {
            background-image: linear-gradient(135deg, #5ee7df 0%, #b490ca 100%);
        }
        #top_6 {
            background-image: linear-gradient(135deg, #d299c2 0%, #fef9d7 100%);
        }
        #top_7 {
            background-image: linear-gradient(135deg, #ebc0fd 0%, #d9ded8 100%);
        }
        #top_8 {
            background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
        }
        #top_9 {
            background-image: linear-gradient(to top, #96fbc4 0%, #f9f586 100%);
        }
        #top_10 {
            background-image: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
        }
    }
`;
