import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import learReducer from "./features/learn/learnSlice";
import infoReducer from "./features/info/infoSlice";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        mainLearn: learReducer,
        info: infoReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
