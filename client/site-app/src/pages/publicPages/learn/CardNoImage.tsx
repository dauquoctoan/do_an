import React from "react";
import styled from "styled-components";
import { COLOR } from "../../../constant";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setChose } from "../../../store/features/learn/learnSlice";

const CardNoImage = () => {
    const dispatch = useDispatch();
    const mainLearn = useSelector((state: RootState) => state.mainLearn);

    return (
        <SCardNoImage>
            <div className="wrapper">
                <div className="wrapper-item">
                    {mainLearn?.data[mainLearn.index - 1]?.options.map(
                        (item: any, i: number) => {
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
                                    <h4>{index}</h4>
                                    <div> {item.title}</div>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
        </SCardNoImage>
    );
};

export default CardNoImage;

const SCardNoImage = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .wrapper {
        width: 100%;
        .wrapper-item {
            width: 100%;
            height: auto;
            margin-bottom: 10px;
            .item {
                width: 100%;
                padding: 10px 20px;
                margin-bottom: 10px;
                border: 1px solid ${COLOR.colors.border_color};
                border-radius: 15px;
                text-align: center;
                cursor: pointer;
                display: flex;
                align-items: center;
                div {
                    flex: 1;
                    text-align: center;
                }
            }
            .active {
                background-color: ${COLOR.colors.mail_color};
                color: white;
            }
            .item:hover {
                /* background-color: ${COLOR.colors.mail_color}; */
                /* color: white; */
            }
        }
    }
`;
