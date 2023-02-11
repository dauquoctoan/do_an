import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "./features/counter/socketSlice";
import learReducer from "./features/learn/learnSlice";
import infoReducer from "./features/info/infoSlice";
import infoRoomSlice from "./features/game/index";

const store = configureStore({
    reducer: {
        socket: socketReducer,
        mainLearn: learReducer,
        info: infoReducer,
        infoRoomSlice: infoRoomSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
