import React, { useState } from "react";
import styled from "styled-components";
import { SLearnContent } from "../../../globalStyled";
import ClearIcon from "@mui/icons-material/Clear";
import { Slider } from "@mui/material";
import { history } from "../../../utils/history";
import LearnContent from "./LearnContent";
import { notify } from "../../../commons/notification";

const LearnMain = () => {
    const [index, setIndex] = useState<number>(1);
    const [listResult, setListResult] = useState<boolean[]>([]);

    function valueLabelFormat(value: number) {
        return `Câu số: ${value}`;
    }

    function handleSelect(status: boolean) {
        setListResult([...listResult, status]);
        if (index < data.length) {
            setIndex(index + 1);
        } else {
            notify.success("Hoàn thành");
        }
    }

    const data = [
        {
            type: "card",
            question: [
                {
                    img: "https://d2pur3iezf4d1j.cloudfront.net/images/0516427ca6895c2a3921b745a175fe77",
                    title: "title",
                },
                {
                    img: "https://d2pur3iezf4d1j.cloudfront.net/images/0516427ca6895c2a3921b745a175fe77",
                    title: "title",
                },
                {
                    img: "https://d2pur3iezf4d1j.cloudfront.net/images/0516427ca6895c2a3921b745a175fe77",
                    title: "title",
                },
                {
                    img: "https://d2pur3iezf4d1j.cloudfront.net/images/0516427ca6895c2a3921b745a175fe77",
                    title: "title",
                },
            ],
            answer: 1,
        },
        {
            type: "sort",
            question: [
                {
                    img: "https://d2pur3iezf4d1j.cloudfront.net/images/0516427ca6895c2a3921b745a175fe77",
                    title: "title2",
                },
                {
                    img: "https://d2pur3iezf4d1j.cloudfront.net/images/0516427ca6895c2a3921b745a175fe77",
                    title: "title3",
                },
                {
                    img: "https://d2pur3iezf4d1j.cloudfront.net/images/0516427ca6895c2a3921b745a175fe77",
                    title: "title3",
                },
                {
                    img: "https://d2pur3iezf4d1j.cloudfront.net/images/0516427ca6895c2a3921b745a175fe77",
                    title: "title3",
                },
            ],
            answer: 1,
        },
        {
            type: "sort",
            question: [
                {
                    img: "https://d2pur3iezf4d1j.cloudfront.net/images/0516427ca6895c2a3921b745a175fe77",
                    title: "title2",
                },
                {
                    img: "https://d2pur3iezf4d1j.cloudfront.net/images/0516427ca6895c2a3921b745a175fe77",
                    title: "title3",
                },
                {
                    img: "https://d2pur3iezf4d1j.cloudfront.net/images/0516427ca6895c2a3921b745a175fe77",
                    title: "title3",
                },
                {
                    img: "https://d2pur3iezf4d1j.cloudfront.net/images/0516427ca6895c2a3921b745a175fe77",
                    title: "title3",
                },
            ],
            answer: 1,
        },
    ];
    console.log(listResult);
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
                                value={index}
                                max={data.length}
                                disabled={true}
                                onChange={(e: any) => {
                                    setIndex(e?.target?.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="content">
                        <LearnContent
                            handleSelect={handleSelect}
                            data={data[index - 1]}
                        />
                    </div>
                </div>
            </SLearnContent>
        </SLearnMain>
    );
};

export default LearnMain;

const SLearnMain = styled.div`
    .content {
        width: 100%;
        height: 100vh;
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
    }
`;
