import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: IInfo = {};

export interface IInfo {
    id?: string;
    name?: string;
    point?: number;
    picture?: string;
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
        },
        setPoint: (state, action: PayloadAction<number>) => {
            state.point = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setInfo, setPoint } = infoSlice.actions;

export default infoSlice.reducer;
