import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: IInfo = { openPay: false, listCourse: [], order: {} };

export interface IInfo {
    id?: string;
    name?: string;
    point?: number;
    picture?: string;
    openPay: boolean;
    listCourse: any[],
    order: any,
}

export const infoSlice = createSlice({
    name: "info",
    initialState,
    reducers: {
        setInfo: (state, action: PayloadAction<any>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.point = action.payload.point;
            state.picture = action.payload.picture;
            state.listCourse = action?.payload?.listCourse || [];
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
        openPay: (state) => {
            state.openPay = !state.openPay
        },
        setOrder: (state, action: PayloadAction<any>) => {
            state.order = action.payload
        },
        setlistCourse: (state, action: PayloadAction<any>) => {
            state.listCourse = action.payload
        }
    },
});

// Action creators are generated for each case reducer function
export const { setInfo, setPoint, openPay, setOrder, setlistCourse, reSetInfo } = infoSlice.actions;

export default infoSlice.reducer;
