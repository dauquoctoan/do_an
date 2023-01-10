import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import configs from '../../configs'
import Cookie from 'js-cookie'
import { getUser, logout } from '../../features/Auth/api'
import Configs from '../../configs'
import history from '../../utils/history'

export interface IAuth {
  isLoading: boolean
  dialogLoading: boolean
  userInfo: any
  error: boolean
}

let initialState: any = {
  isLoading: true,
  dialogLoading: false,
  userInfo: null,
  error: false,
}

export const getUserInfoAction = createAsyncThunk(
  'getUserInfoAction',
  async (payload, thunkApi) => {
    const res = await getUser()
    return res
  }
)

export const logoutAction = createAsyncThunk('auth/logout', async () => {
  const res = await logout()
  return res.data
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
    },
  },
  extraReducers: (builder) => {
    /* getUserInfo actions */
    builder.addCase(getUserInfoAction.pending, (state: IAuth, action) => {
      console.log('pending', action.payload)
      state.isLoading = true
      return state
    })

    builder.addCase(getUserInfoAction.fulfilled, (state: IAuth, action) => {
      console.log('fulfilled', action.payload)
      state.userInfo = action.payload
      state.isLoading = false
      return state
    })

    builder.addCase(getUserInfoAction.rejected, (state: IAuth, action) => {
      console.log('rejected', action.payload)
      state.isLoading = false
      state.userInfo = null
      state.error = true
      Cookie.remove(Configs._sessionId)
      history.replace('/login')
      return state
    })

    /* logout actions */
    builder.addCase(logoutAction.pending, (state, action) => {
      state.isLoading = true
      return state
    })
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state = initialState
      Cookie.remove(configs._sessionId)
      window.location.href = '/'
      return state
    })
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.isLoading = false
      return state
    })
  },
})

export const selectCount = (state: any) => state.account
export const { setData } = authSlice.actions

export default authSlice.reducer
