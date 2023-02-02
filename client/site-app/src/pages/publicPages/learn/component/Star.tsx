import { Rating } from "@mui/lab";
import styled from "styled-components";
import { COLOR } from "../../../../constant";
import { Button, Modal, Box } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import ApiClient from "../../../../services";
import { setInfo, setPoint } from "../../../../store/features/info/infoSlice";
import { resetData } from "../../../../store/features/learn/learnSlice";

const Star = ({ open }: { open: boolean }) => {
    const [star, setStar] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => {
        return state.mainLearn;
    });

    const info = useSelector((state: RootState) => {
        return state.info;
    });

    function pointStar(point: number) {
        if (point >= 30 && point < 60) {
            return 2;
        }
        if (point >= 60 && point < 80) {
            return 3;
        }
        if (point >= 80 && point < 100) {
            return 4;
        }
        if (point === 100) {
            return 5;
        } else {
            return 1;
        }
    }

    async function handleFinish() {
        const rest = await ApiClient.put("/site/user", {
            _id: info.id,
            type: star,
        });
        localStorage.setItem("point", rest.data.point);
        dispatch(setPoint(rest.data.point));
        dispatch(resetData());
        navigate("/learn/topic");
    }

    useEffect(() => {
        if (state) {
            const count = state.listAnswer.reduce((c: any, e: any) => {
                if (e) {
                    return c + 1;
                } else {
                    return c;
                }
            }, 0);
            setStar(pointStar(Math.floor((count / state.data.length) * 100)));
        }
    }, [open]);

    return (
        <SStar>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                hideBackdrop
                onClose={handleFinish}
                closeAfterTransition
                open={open}
            >
                <SBox>
                    <div className="icon">
                        <DoneIcon className="check" />
                    </div>
                    <h2 id="child-modal-title">Hoàn thành</h2>
                    <div style={{ padding: "10px 10px" }}>
                        <Rating value={star} />
                    </div>
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleFinish();
                        }}
                    >
                        Tiếp tục
                    </Button>
                </SBox>
            </Modal>
        </SStar>
    );
};

export default Star;

const SStar = styled.div``;

const SBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
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
