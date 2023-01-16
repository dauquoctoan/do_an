import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ITopic {
  _id: string | null
  name: string | null
  desc: string | null
  picture: string | null
}

let initialState: {
  index: number
  typeTopic: {
    _id: number
    value: string
  } | null
  topic: ITopic | null
  content: any
} = {
  index: 1,
  typeTopic: null,
  topic: null,
  content: undefined,
}

export const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    setTopic: (state, action: PayloadAction<ITopic>) => {
      state.topic = action.payload
      state.index = 2
    },
    setContent: (state, action: PayloadAction<any>) => {
      state.content = action.payload
    },
    setTypeTopic: (state, action: PayloadAction<any>) => {
      state.typeTopic = action.payload
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
  },
})

export const { setTopic, prev, next, setTypeTopic } = lessonSlice.actions
export default lessonSlice.reducer
