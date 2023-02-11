import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { dontJoinRoom, setIsModal } from "../store/features/game";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function ModalJoiGame() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(dontJoinRoom());
    };
    const { infoRoomSlice, socket, info } = useSelector(
        (state: RootState) => state
    );
    function handleJoiGame() {
        socket.socket.emit("accept_the_competition", {
            room: infoRoomSlice.infoRoom?.id_friend,
            id_room_game: infoRoomSlice.infoRoom?.id_room_game,
            id_friend: info.id,
            name_friend: info.name,
        });
        socket.socket.emit("join_room", infoRoomSlice.infoRoom?.id_room_game);
        dispatch(setIsModal(false));
        navigate("/lesson");
    }
    return (
        <ModalStyled>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={infoRoomSlice.isModal}
                onClose={handleClose}
                closeAfterTransition
                onBackdropClick={handleClose}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={infoRoomSlice.isModal}>
                    <Box sx={style}>
                        <Typography
                            id="transition-modal-description"
                            sx={{ mt: 2 }}
                        >
                            {infoRoomSlice.infoRoom?.name_friend} đã mời bạn
                            tham gia trận đấu
                        </Typography>
                        <div className="wraper-button">
                            <Button onClick={handleJoiGame} variant="contained">
                                Tham gia
                            </Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </ModalStyled>
    );
}

const ModalStyled = styled.div`
    .wraper-button {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        justify-items: center;
    }
`;
