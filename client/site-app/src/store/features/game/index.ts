import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IGame = {
    isModal: false,
    infoRoom: null,
    type_user: false,
};

export interface IGame {
    isModal: boolean;
    infoRoom: {
        name_friend: string;
        id_room_game: string;
        id_friend: string;
    } | null;
    /* true là người được mời false là người mời */
    type_user: boolean;
}

export const infoRoomSlice = createSlice({
    name: "infoRoomSlice",
    initialState,
    reducers: {
        setJoinRoom(state, action) {
            state.isModal = action.payload.isModal;
            state.infoRoom = action.payload.infoRoom;
        },
        dontJoinRoom(state) {
            state.isModal = false;
            state.infoRoom = null;
        },
        setIsModal(state, action) {
            state.isModal = action.payload;
            state.type_user = true;
        },
        setInfoRoom(state, action) {
            state.infoRoom = action.payload;
        },
    },
});

export const { setJoinRoom, dontJoinRoom, setIsModal, setInfoRoom } =
    infoRoomSlice.actions;

export default infoRoomSlice.reducer;
