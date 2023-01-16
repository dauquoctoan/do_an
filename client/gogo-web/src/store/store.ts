import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import RootReducer from './rootReducer'

const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  enhancers: [],
})

export default store

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
