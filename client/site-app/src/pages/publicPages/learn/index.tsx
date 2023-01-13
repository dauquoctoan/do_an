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
} from "../../../store/features/learn/learnSlice";
import { IDataItem } from "./interface";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Button, Modal, Box } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { COLOR } from "../../../constant";

const LearnMain = () => {
    const dispatch = useDispatch();
    const mainLearn = useSelector((state: RootState) => state.mainLearn);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const data: IDataItem[] = [
        {
            type: "card",
            option: [
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
            type: "card",
            option: [
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
            type: "card",
            option: [
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
            type: "card",
            option: [
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
    ];
    useEffect(() => {
        dispatch(incrementByAmount(data));
    }, []);

    function valueLabelFormat(value: number) {
        return `Câu số: ${value}`;
    }

    function handleCheckAnswer() {
        if (mainLearn.chose === mainLearn.data[mainLearn.index].answer) {
            handleOpen();
        } else {
            handleOpen();
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
                    <div className="content">
                        <LearnContent
                            type={mainLearn.data[mainLearn.index - 1].type}
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
                </div>
            </SLearnContent>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                hideBackdrop
                closeAfterTransition
                open={open}
                onClose={handleClose}
            >
                <SBox>
                    <div className="icon">
                        <DoneIcon className="check" />
                    </div>
                    <h2 id="child-modal-title">Chính xác</h2>
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleClose();
                            dispatch(next());
                        }}
                    >
                        Tiếp tục
                    </Button>
                </SBox>
            </Modal>
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

const SBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: white;
    border: 2px solid ${COLOR.primary.light};
    box-shadow: 24;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    .icon {
        width: 110px;
        height: 110px;
        border-radius: 50%;
        background-color: ${COLOR.primary.light};
        display: flex;
        align-items: center;
        justify-content: center;
        .check {
            font-size: 80px;
            color: white;
        }
    }
`;
