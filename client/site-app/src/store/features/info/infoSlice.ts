import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: IInfo = {
    openPay: false,
    listCourse: [],
    order: {},
    listOnline: {},
    listFriends: [],
    id_room_learn: null,
};

export interface IInfo {
    id?: string;
    name?: string;
    point?: number;
    picture?: string;
    openPay: boolean;
    listCourse: any[];
    order: any;
    listFriends: any[];
    listOnline: any;
    id_room_learn: string | null;
}

export const infoSlice = createSlice({
    name: "info",
    initialState,
    reducers: {
        setInfo: (state, action: PayloadAction<any>) => {
            state.id = action.payload._id;
            state.name = action.payload.name;
            state.point = action.payload.point;
            state.picture = action.payload.picture;
            state.listCourse = action?.payload?.listCourse || [];
            state.listFriends = action?.payload?.listFriends || [];
        },
        setPoint: (state, action: PayloadAction<number>) => {
            state.point = action.payload;
        },
        reSetInfo: (state) => {
            state.id = undefined;
            state.name = undefined;
            state.point = undefined;
            state.picture = undefined;
            state.listCourse = [];
        },
        openPay: (state, action: PayloadAction<boolean>) => {
            state.openPay = action.payload;
        },
        setOrder: (state, action: PayloadAction<any>) => {
            state.order = action.payload;
        },
        setlistCourse: (state, action: PayloadAction<any>) => {
            state.listCourse = action.payload;
        },
        setListOnline: (state, action: PayloadAction<any>) => {
            state.listOnline = action.payload;
        },
        setListFriends: (state, action: PayloadAction<any>) => {
            state.listFriends = action.payload;
        },
        setIdRoomLearn: (state, action: PayloadAction<any>) => {
            state.id_room_learn = action.payload;
        },
    },
});

export const {
    setInfo,
    setPoint,
    openPay,
    setOrder,
    setlistCourse,
    reSetInfo,
    setListFriends,
    setListOnline,
    setIdRoomLearn,
} = infoSlice.actions;

export default infoSlice.reducer;
