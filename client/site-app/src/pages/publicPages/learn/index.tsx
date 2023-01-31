import React, { useEffect } from "react";
import styled from "styled-components";
import { SLearnContent } from "../../../globalStyled";
import ClearIcon from "@mui/icons-material/Clear";
import { Slider } from "@mui/material";
import { history } from "../../../utils/history";
import LearnContent from "./LearnContent";
import { useDispatch } from "react-redux";
import {
    incrementByAmount,
    next,
    setListAnswer,
    setOpen,
} from "../../../store/features/learn/learnSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Button } from "@mui/material";
import { audio, type_key } from "../../../constant";
import { useSearchParams } from "react-router-dom";
import { getLessonsBuyPart } from "../../api";
import { shuffle } from "../../../utils";
import ConFirmResult from "./component/ConFirmResult";

const LearnMain = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("part");
    const dispatch = useDispatch();
    const mainLearn = useSelector((state: RootState) => state.mainLearn);
    // const audios = new Audio(audio.correct);
    function mixData(data: any[]) {
        let newArray: any[] = [];
        if (data.length > 0) {
            newArray = data.map((item) => {
                if (
                    item.type === type_key.choose_a_pair ||
                    item.type === type_key.sort
                ) {
                    return { ...item, options: shuffle(item.options) };
                } else {
                    return item;
                }
            });
        }
        return newArray;
    }
    const getData = async () => {
        const res = await getLessonsBuyPart({ part: id });
        dispatch(incrementByAmount(mixData(res.data)));
    };

    useEffect(() => {
        getData();
    }, []);

    function valueLabelFormat(value: number) {
        return `Câu số: ${value}`;
    }
    function getItemIndex() {
        return mainLearn.data[mainLearn.index - 1];
    }
    function CheckCompareTwoArray(arr1: any[] = [], arr2: any[] = []) {
        if (arr1.length < 0 || arr2.length < 0) {
            return false;
        }
        return arr1.every((item, index) => {
            return item.title === arr2[index].title;
        });
    }
    function checkTrueFalse() {
        if (getItemIndex().type === type_key.sort) {
            return CheckCompareTwoArray(
                getItemIndex().answers,
                mainLearn.chose
            );
        } else {
            if (mainLearn.chose === mainLearn.data[mainLearn.index].answer) {
                return true;
            }
        }
        return false;
    }
    function handleCheckAnswer() {
        if (checkTrueFalse()) {
            dispatch(setListAnswer(true));
            dispatch(setOpen(true));
        } else {
            dispatch(setListAnswer(false));
            dispatch(setOpen(true));
        }
    }

    return (
        <SLearnMain>
            <SLearnContent>
                <div className="content">
                    <div className="head">
                        <ClearIcon
                            className="icon"
                            onClick={() => {
                                history.back();
                            }}
                        />
                        <div className="process">
                            <Slider
                                aria-label="Temperature"
                                valueLabelFormat={valueLabelFormat}
                                valueLabelDisplay="auto"
                                step={1}
                                min={1}
                                value={mainLearn?.index}
                                max={mainLearn?.data?.length}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            // audios.play;
                        }}
                    >
                        ...sdfsdf
                    </button>
                    <div className="content">
                        <LearnContent
                            type={mainLearn?.data[mainLearn.index - 1]?.type}
                        />
                    </div>
                    <div className="action">
                        <Button
                            onClick={() => {
                                dispatch(next());
                            }}
                            variant="outlined"
                        >
                            Bỏ qua
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                handleCheckAnswer();
                            }}
                            disabled={mainLearn.chose === 0 ? true : false}
                        >
                            Kiểm tra
                        </Button>
                    </div>
                    <ConFirmResult />
                </div>
            </SLearnContent>
        </SLearnMain>
    );
};

export default LearnMain;

const SLearnMain = styled.div`
    .content {
        width: 100%;
        height: calc(100vh);
        .head {
            display: flex;
            height: 50px;
            width: 100%;
            padding-top: 30px;
            align-items: center;
            .icon {
                cursor: pointer;
                margin-right: 20px;
            }
            .process {
                flex: 1;
            }
        }
        .content {
            height: 500px;
            width: 100%;
        }
        .action {
            display: flex;
            width: 100%;
            justify-content: space-between;
        }
    }
`;
    