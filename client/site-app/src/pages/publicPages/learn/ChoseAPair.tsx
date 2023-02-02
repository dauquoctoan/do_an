import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLOR } from "../../../constant";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import Grid from "@mui/material/Grid";
import {
    next,
    setChose,
    setListAnswer,
    setOpen,
} from "../../../store/features/learn/learnSlice";

const ChoseAPair = () => {
    const dispatch = useDispatch();
    const mainLearn = useSelector((state: RootState) => state.mainLearn);
    const [listChose, setListChose] = useState<any[]>([]);
    const [choseFirst, setChoseFirst] = useState(0);

    function getDataIndex() {
        return mainLearn?.data[mainLearn.index - 1]?.options;
    }

    function checkDisable(index: number) {
        if (
            listChose.find((item) => {
                return item === index;
            })
        ) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        if (listChose.length === getDataIndex().length) {
            dispatch(setListAnswer(true));
            dispatch(setOpen(true));
            dispatch(next());
        }
    }, [listChose]);

    return (
        <SChoseAPair>
            <div className="wrapper">
                <div className="wrapper-item">
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                        {getDataIndex()?.map((item: any, i: number) => {
                            const index = i + 1;
                            return (
                                <Grid item xs={4} sm={8} md={6}>
                                    <button
                                        disabled={checkDisable(index)}
                                        key={index}
                                        className={`${
                                            "item" +
                                            (choseFirst === index
                                                ? " active "
                                                : "")
                                        }`}
                                        onClick={() => {
                                            if (!choseFirst) {
                                                setChoseFirst(index);
                                            } else {
                                                if (
                                                    item.group ===
                                                    getDataIndex()[
                                                        choseFirst - 1
                                                    ].group
                                                ) {
                                                    setListChose([
                                                        ...listChose,
                                                        choseFirst,
                                                        index,
                                                    ]);
                                                    setChoseFirst(0);
                                                } else {
                                                    dispatch(
                                                        setListAnswer(false)
                                                    );
                                                    dispatch(setOpen(true));
                                                    dispatch(next());
                                                }
                                            }
                                        }}
                                    >
                                        <h4>{index}</h4>
                                        <div> {item.title}</div>
                                    </button>
                                </Grid>
                            );
                        })}
                    </Grid>
                </div>
            </div>
        </SChoseAPair>
    );
};

export default ChoseAPair;

const SChoseAPair = styled.div`
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
            .disable {
                opacity: 0.5;
            }
            .item:hover {
                /* background-color: ${COLOR.colors.mail_color}; */
                /* color: white; */
            }
        }
    }
`;
