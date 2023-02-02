import React, { useEffect, useRef, useState } from "react";
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
import Star from "./component/Star";
import _ from "lodash";
import ReactAudioPlayer from "react-audio-player";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const LearnMain = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("part");
    const dispatch = useDispatch();
    const mainLearn = useSelector((state: RootState) => state.mainLearn);
    const [resultDone, setResultDone] = useState(false);
    const [isPlay, setIsPlay] = useState(false);
    const ref = useRef<any>(null);

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

    function checkTrueFalse() {
        if (getItemIndex().type === type_key.sort) {
            return _.isEqual(getItemIndex().answers, mainLearn.chose);
            //  CheckCompareTwoArray(
            //     getItemIndex().answers,
            //     mainLearn.chose
            // );
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

    useEffect(() => {
        if (
            mainLearn.index !== 1 &&
            mainLearn.index === mainLearn.data.length
        ) {
            setResultDone(true);
        }
    }, [mainLearn.index, mainLearn.data]);

    useEffect(() => {
        if (isPlay) {
            ref.current.play();
        } else {
            ref.current.pause();
        }
    }, [isPlay]);

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
                    <audio ref={ref} id="audio-soult">
                        <source src={audio.correct} type="audio/mpeg"></source>
                    </audio>
                    <button
                        className="play"
                        onClick={() => {
                            setIsPlay(!isPlay);
                        }}
                    >
                        {isPlay ? (
                            <VolumeDownIcon className="icon" />
                        ) : (
                            <VolumeUpIcon className="icon" />
                        )}
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
            <Star open={resultDone} />
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
        .play {
            margin-top: 20px;
            background-color: transparent;
            border: none;
            cursor: pointer;
            .icon {
                width: 40px;
                height: 40px;
            }
        }
    }
`;
