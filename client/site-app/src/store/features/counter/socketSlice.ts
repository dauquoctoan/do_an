import { createSlice } from "@reduxjs/toolkit";

import io from "socket.io-client";
const socket = io("http://localhost:3005", {
    extraHeaders: {
        Authorization: localStorage.getItem("token") || "",
    },
});

export interface CounterState {
    socket: any;
}

const initialState: CounterState = {
    socket: socket,
};

export const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = socketSlice.actions;

export default socketSlice.reducer;
