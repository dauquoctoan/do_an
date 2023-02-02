import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import styled from "styled-components";
import { COLOR } from "../../../constant";
import io from "socket.io-client";
import { useState } from "react";
import ApiClient from "../../../services";

const socket = io("http://localhost:3005", {
    extraHeaders: {
        Authorization: localStorage.getItem("token") || "",
    },
});

const Top = () => {
    const [tops, setTops] = useState<any>([]);
    socket.emit("join_room", "123");
    React.useEffect(() => {
        socket.on("receive_message", (data: any) => {
            console.log("data", data);
        });

        socket.on("error", (error: any) => {
            console.log(error);
        });
    }, [socket]);

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
                                    <Avatar alt="img" src={e.picture} />
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
