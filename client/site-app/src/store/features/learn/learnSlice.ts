import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LearnState {
    chose: number;
    index: number;
    data: IQuestions[];
}

export interface IQuestions {
    type: string;
    option: {
        title: string;
        img: string;
    }[];
    answer: number;
    status?: boolean | null;
}

const initialState: LearnState = {
    chose: 0,
    index: 1,
    data: [
        {
            type: "card",
            option: [
                {
                    img: "https://d2pur3iezf4d1j.cloudfront.net/images/0516427ca6895c2a3921b745a175fe77",
                    title: "title",
                },
                {
                    img: "https://d2pur3iezf4d1j.cloudfront.net/images/0516427ca6895c2a3921b745a175fe77",
                    title: "title",
                },
                {
                    img: "https://d2pur3iezf4d1j.cloudfront.net/images/0516427ca6895c2a3921b745a175fe77",
                    title: "title",
                },
                {
                    img: "https://d2pur3iezf4d1j.cloudfront.net/images/0516427ca6895c2a3921b745a175fe77",
                    title: "title",
                },
            ],
            answer: 1,
        },
    ],
};

export const learnSlice = createSlice({
    name: "mainLearning",
    initialState,
    reducers: {
        next: (state) => {
            state.index += state.index < state.data.length ? 1 : 0;
            state.chose = 0;
        },
        incrementByAmount: (state, action: PayloadAction<IQuestions[]>) => {
            state.data = action.payload;
        },
        setChose: (state, action: PayloadAction<number>) => {
            state.chose = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { next, incrementByAmount, setChose } = learnSlice.actions;

export default learnSlice.reducer;
