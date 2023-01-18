import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ITopic {
  _id: string | null
  name: string | null
  desc: string | null
  picture: string | null
}

export interface IOptions {
  title: string
  picture: string
}

export interface IContent {
  title: string
  level: number
  options: IOptions[]
  answer?: number
  answers?: number
}

export interface ILesson {
  index: number
  type: string | null
  topic: ITopic | null
  content: IContent | null
}

let initialState: ILesson = {
  index: 1,
  type: null,
  topic: null,
  content: null,
}

export const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    setTopic: (state, action: PayloadAction<ITopic>) => {
      state.topic = action.payload
      state.index = 2
    },
    setContent: (state, action: PayloadAction<IContent>) => {
      state.content = action.payload
    },
    setTypeTopic: (state, action: PayloadAction<any>) => {
      state.type = action.payload
      state.index = 3
    },
    prev: (state) => {
      if (state.index === 1) {
        state.index = 1
      } else {
        state.index -= 1
      }
    },
    next: (state) => {
      if (state.index === 3) {
        state.index = 3
      } else {
        state.index += 1
      }
    },
    resetLesson: (state) => {
      state.index = 1
      state.type = null
      state.topic = null
      state.content = null
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
} = lessonSlice.actions
export default lessonSlice.reducer
