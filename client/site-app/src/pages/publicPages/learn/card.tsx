import { Button } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { notify } from "../../../commons/notification";
import { COLOR } from "../../../constant";
import { IDataItem } from "./interface";

interface IProps {
    handleSelect: (status: boolean) => void;
    data: IDataItem;
}

const Card = ({ data, handleSelect }: IProps) => {
    const [answer, setAnswer] = useState<number>(0);
    function handleCheck() {
        if (answer === data.answer) {
            notify.exactly("Chính xác");
            handleSelect(true);
        } else {
            notify.incorrect("Sai!");
            handleSelect(false);
        }
    }
    return (
        <SCard>
            <div className="wrapper">
                <div className="wrapper-item">
                    {data?.question?.map((item, i) => {
                        const index = i + 1;
                        return (
                            <div
                                className={
                                    answer === index ? "item active" : "item"
                                }
                                onClick={() => {
                                    setAnswer(index);
                                }}
                            >
                                <img src={item.img} alt="img" />
                                <div className="content">
                                    <p>{item.title}</p>
                                    <div className="number">{index}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="action">
                    <Button variant="outlined">Bỏ qua</Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setAnswer(0);
                            handleCheck();
                        }}
                    >
                        Kiểm tra
                    </Button>
                </div>
            </div>
        </SCard>
    );
};

export default Card;

const SCard = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .wrapper {
        .wrapper-item {
            height: auto;
            display: flex;
            margin-bottom: 50px;
            .item {
                width: 160px;
                height: 200px;
                padding: 10px;
                border-radius: 12px;
                border: 2px solid #e5e5e5;
                margin-right: 10px;
                cursor: pointer;
                img {
                    width: 100%;
                    height: 150px;
                }
                .content {
                    width: 100%;
                    height: 50px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    p {
                        font-size: 17px;
                        font: 500 17px/20px sans-serif;
                    }
                    .number {
                        width: 30px;
                        height: 30px;
                        border-radius: 8px;
                        border: 2px solid #e5e5e5;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }
            .active {
                background-color: ${COLOR.primary.light};
                border: 2px solid ${COLOR.primary.dark};
                color: white;
                .content {
                    .number {
                        border: 2px solid ${COLOR.primary.dark};
                    }
                }
            }
        }
        .action {
            display: flex;
            justify-content: space-between;
        }
    }
`;
