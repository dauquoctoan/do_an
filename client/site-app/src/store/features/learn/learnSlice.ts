import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LearnState {
    listAnswer: boolean[];
    chose: any;
    index: number;
    open: boolean;
    data: IQuestions[];
}

export interface IQuestions {
    type: string;
    title: string;
    options: any[];
    answers?: any[];
    answer?: number;
    status?: boolean;
}

const initialState: LearnState = {
    listAnswer: [],
    chose: null,
    index: 1,
    data: [
        {
            type: "",
            title: "",
            options: [],
            answers: [],
            answer: 1,
            status: false,
        },
    ],
    open: false,
};

export const learnSlice = createSlice({
    name: "mainLearning",
    initialState,
    reducers: {
        setListAnswer: (state, action: PayloadAction<boolean>) => {
            state.listAnswer = [...state.listAnswer, action.payload];
        },
        setOpen: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;
        },
        next: (state) => {
            state.index += state.index < state.data.length ? 1 : 0;
            state.chose = 0;
        },
        incrementByAmount: (state, action: PayloadAction<IQuestions[]>) => {
            state.data = action.payload;
        },
        setChose: (state, action: PayloadAction<any>) => {
            state.chose = action.payload;
        },
        resetData: (state) => {
            state.listAnswer = [];
            state.chose = null;
            state.index = 1;
            state.data = [
                {
                    type: "",
                    title: "",
                    options: [],
                    answers: [],
                    answer: 1,
                    status: false,
                },
            ];
            state.open = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    next,
    incrementByAmount,
    setChose,
    setListAnswer,
    setOpen,
    resetData,
} = learnSlice.actions;

export default learnSlice.reducer;
