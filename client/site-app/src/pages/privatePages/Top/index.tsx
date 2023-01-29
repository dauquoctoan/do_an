import { Avatar } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { COLOR } from "../../../constant";

const Top = () => {
    return (
        <STop>
            <div className="container">
                <h3>Top 100 người có số điểm cao nhất</h3>
                <div className="item">
                    <div>
                        <div>#1</div>
                        <p>Hoàng sơn</p>
                    </div>
                    <Avatar alt="img" src="" />
                </div>
                <div className="item">
                    <div>
                        <div>#1</div>
                        <p>Hoàng sơn</p>
                    </div>
                    <Avatar alt="img" src="" />
                </div>
                <div className="item">
                    <div>
                        <div>#1</div>
                        <p>Hoàng sơn</p>
                    </div>
                    <Avatar alt="img" src="" />
                </div>
                <div className="item">
                    <div>
                        <div>#1</div>
                        <p>Hoàng sơn</p>
                    </div>
                    <Avatar alt="img" src="" />
                </div>
                <div className="item">
                    <div>
                        <div>#1</div>
                        <p>Hoàng sơn</p>
                    </div>
                    <Avatar alt="img" src="" />
                </div>
                <div className="item">
                    <div>
                        <div>#1</div>
                        <p>Hoàng sơn</p>
                    </div>
                    <Avatar alt="img" src="" />
                </div>
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
            background-color: #fb8500;
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            div {
                display: flex;
                align-items: center;
                p {
                    margin-left: 20px;
                }
            }
        }
        h3 {
            text-align: center;
        }
    }
`;
