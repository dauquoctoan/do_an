import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SLearnContent } from "../../../globalStyled";
import ClearIcon from "@mui/icons-material/Clear";
import { CardMedia, Slider } from "@mui/material";
import { history } from "../../../utils/history";
import LearnContent from "./LearnContent";
import { useDispatch } from "react-redux";
import {
    setData,
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
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import ReactLoading from "react-loading";
import ApiClient from "../../../services";

const LearnMain = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("part");
    const type = searchParams.get("type");
    const dispatch = useDispatch();
    const { mainLearn, info, infoRoomSlice, socket } = useSelector(
        (state: RootState) => state
    );
    const [resultDone, setResultDone] = useState(false);
    const [isPlay, setIsPlay] = useState(false);
    const ref = useRef<any>(null);
    const refSS = useRef<any>(null);
    const refCR = useRef<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

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
        setLoading(true);
        const res = id
            ? await getLessonsBuyPart({ part: id })
            : await ApiClient.get("/site/random-lessons", { limit: 20 });
        dispatch(setData(mixData(res.data)));
        socket.socket.emit("sen_lesson", {
            room: infoRoomSlice.infoRoom?.id_room_game,
            data: res.data,
        });
        setLoading(false);
    };

    useEffect(() => {
        !infoRoomSlice.type_user && getData();
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
        // if (mainLearn?.data[mainLearn.index - 1]?.audio) {
        if (isPlay) {
            ref.current.play();
        } else {
            ref.current.pause();
        }
        // }
    }, [isPlay]);

    return (
        <>
            <SLearnMain>
                <SLearnContent>
                    <audio ref={refCR}>
                        <source src={audio.correct} type="audio/mpeg"></source>
                    </audio>
                    <audio ref={refSS}>
                        <source src={audio.success} type="audio/mpeg"></source>
                    </audio>
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
                                    sx={{ width: "80%" }}
                                    value={mainLearn?.index}
                                    max={mainLearn?.data?.length}
                                    disabled={true}
                                />
                            </div>
                            <div>{info.name}</div>
                            <div
                                style={{
                                    fontSize: 30,
                                    fontWeight: 600,
                                    marginLeft: 10,
                                    marginRight: 10,
                                }}
                            >
                                VS
                            </div>
                            <div>{infoRoomSlice.infoRoom?.name_friend}</div>
                            <div className="process" style={{ marginLeft: 20 }}>
                                <Slider
                                    aria-label="Temperature"
                                    valueLabelFormat={valueLabelFormat}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    min={1}
                                    sx={{ width: "80%" }}
                                    value={mainLearn?.index}
                                    max={mainLearn?.data?.length}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="desc">
                            <audio ref={ref} id="audio-soult">
                                {mainLearn?.data[mainLearn.index - 1]
                                    ?.audio && (
                                    <source
                                        src={
                                            mainLearn?.data[mainLearn.index - 1]
                                                ?.audio
                                        }
                                        type="audio/mpeg"
                                    ></source>
                                )}
                            </audio>
                            {mainLearn?.data[mainLearn.index - 1]?.audio && (
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
                            )}
                            <h6>
                                {mainLearn?.data[mainLearn.index - 1]?.title}
                            </h6>
                        </div>
                        <div className="image">
                            <CardMedia
                                sx={{ height: 60, width: 60 }}
                                image={
                                    mainLearn?.data[mainLearn.index - 1]
                                        ?.picture
                                }
                                title="img"
                            />
                        </div>
                        <div className="content">
                            <LearnContent
                                type={
                                    mainLearn?.data[mainLearn.index - 1]?.type
                                }
                            />
                        </div>
                        <div className="action">
                            <Button
                                onClick={() => {
                                    dispatch(setListAnswer(false));
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
                        <ConFirmResult ss={refSS} er={refCR} />
                    </div>
                </SLearnContent>
                <Star open={resultDone} />
            </SLearnMain>
            {loading && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "#fff",
                        display: "flex",
                        justifyItems: "center",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div>Loadding</div>
                    <ReactLoading
                        width={60}
                        height={60}
                        type={"bubbles"}
                        color="black"
                    />
                </div>
            )}
        </>
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
        .desc {
            margin-top: 20px;
            display: flex;
            align-items: center;
            justify-items: center;
            div {
                margin-left: 20px;
            }
        }
        .image {
            width: 100%;
            height: auto;
            display: flex;
            justify-content: center;
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
