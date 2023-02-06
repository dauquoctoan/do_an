import React, { useEffect, useRef } from "react";
import { COLOR } from "../../../../constant";
import { Button, Modal, Box } from "@mui/material";
import styled from "styled-components";
import { next, setOpen } from "../../../../store/features/learn/learnSlice";
import { useDispatch, useSelector } from "react-redux";
import DoneIcon from "@mui/icons-material/Done";
import { RootState } from "../../../../store";

const ConFirmResult = (props: any) => {
    const dispatch = useDispatch();
    const { listAnswer, open } = useSelector((state: RootState) => {
        return state?.mainLearn;
    });
    useEffect(() => {
        if (listAnswer.length > 0) {
            if (listAnswer[listAnswer.length - 1]) {
                props?.ss?.current?.play()
            } else {
                props?.er?.current?.play();
            }
        }

    }, [listAnswer]);

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            hideBackdrop
            closeAfterTransition
            open={open}
            onClose={() => {
                dispatch(setOpen(false));
            }}
        >
            <SBox>
                <div
                    className={
                        listAnswer[listAnswer.length - 1]
                            ? "ss" + " icon "
                            : "err" + " icon "
                    }
                >
                    <DoneIcon className="check" />
                </div>
                <h2 id="child-modal-title">
                    {listAnswer[listAnswer.length - 1]
                        ? "Chính xác"
                        : "Không chính xác"}
                </h2>
                <Button
                    variant="contained"
                    onClick={() => {
                        dispatch(setOpen(false));
                        dispatch(next());
                    }}
                    color={
                        listAnswer[listAnswer.length - 1] ? "success" : "error"
                    }
                >
                    Tiếp tục
                </Button>
            </SBox>
        </Modal>
    );
};

export default ConFirmResult;

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

        display: flex;
        align-items: center;
        justify-content: center;
        .check {
            font-size: 80px;
            color: white;
        }
    }
    .ss {
        background-color: ${COLOR.colors.success_color};
    }
    .err {
        background-color: ${COLOR.colors.error_color};
    }
`;
