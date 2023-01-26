import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ITopic {
  _id: string | null
  name: string | null
  desc: string | null
  picture: string | null
}
export interface IPart {
  _id: string | null
  title: string | null
  desc: string | null
  picture: string | null
  topic: string | ITopic
}

export interface IOptions {
  title: string
  picture: string
}

export interface IContent {
  title: string | null
  level: number | null
  options: IOptions[] | []
  answer?: number | null
  answers: string[] | []
}

export interface ILesson {
  index: number
  type: string | null
  topic?: ITopic | null
  part: string | IPart
  content: IContent
}

const defaultContent = {
  level: null,
  options: [],
  title: null,
  answers: [],
  answer: null,
}

let initialState: ILesson = {
  index: 1,
  type: null,
  part: '',
  topic: null,
  content: defaultContent,
}

export const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    setTopic: (state, action: PayloadAction<ITopic>) => {
      state.topic = action.payload
      state.index = 2
    },
    setPart: (state, action: PayloadAction<string>) => {
      state.part = action.payload
      state.index = 3
    },
    setAnswers: (state, action: PayloadAction<string>) => {
      state.content = {
        ...state.content,
        answers: [...state.content.answers, action.payload],
      }
    },
    setSortAnswers: (state, action: PayloadAction<string[]>) => {
      state.content.answers = action.payload
    },
    setContent: (state, action: PayloadAction<IContent>) => {
      state.content = action.payload
    },
    setTypeTopic: (state, action: PayloadAction<any>) => {
      state.type = action.payload
      state.index = 4
    },
    prev: (state) => {
      if (state.index === 1) {
        state.index = 1
      } else {
        state.index -= 1
      }
    },
    next: (state) => {
      if (state.index === 4) {
        state.index = 4
      } else {
        state.index += 1
      }
    },
    resetLesson: (state) => {
      state.index = 1
      state.type = null
      state.topic = null
      state.content = defaultContent
    },
    setLesson: (state, action: PayloadAction<ILesson>) => {
      state.content = action.payload.content
      state.index = action.payload.index
      state.topic = action.payload.topic
      state.type = action.payload.type
    },
  },
})

export const {
  setTopic,
  prev,
  next,
  setTypeTopic,
  setContent,
  resetLesson,
  setLesson,
  setAnswers,
  setSortAnswers,
  setPart,
} = lessonSlice.actions
export default lessonSlice.reducer
