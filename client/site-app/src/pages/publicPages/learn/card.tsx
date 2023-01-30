import React from "react";
import styled from "styled-components";
import { COLOR } from "../../../constant";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setChose } from "../../../store/features/learn/learnSlice";

const Card = () => {
    const dispatch = useDispatch();
    const mainLearn = useSelector((state: RootState) => state.mainLearn);
    function getData() {
        return mainLearn.data[mainLearn.index - 1].options;
    }
    return (
        <SCard>
            <div className="wrapper">
                <div className="wrapper-item">
                    {getData().map((item: any, i: number) => {
                        const index = i + 1;
                        return (
                            <div
                                key={index}
                                className={
                                    mainLearn.chose === index
                                        ? "item active"
                                        : "item"
                                }
                                onClick={() => {
                                    dispatch(setChose(index));
                                }}
                            >
                                <img
                                    src={item.picture}
                                    alt="img"
                                    style={{ width: "90%", height: "70%" }}
                                />
                                <div className="content">
                                    <p>{item.title}</p>
                                    <div className="number">{index}</div>
                                </div>
                            </div>
                        );
                    })}
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
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            .active {
                border: 2px solid ${COLOR.primary.light};
                .content {
                    .number {
                        border: 2px solid ${COLOR.primary.dark};
                    }
                }
            }
        }
    }
`;
