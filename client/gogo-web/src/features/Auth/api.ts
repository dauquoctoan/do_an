import { apis } from '../../configs/api'
import { ApiClient } from '../../services'

export const login = (payload: any) => {
  return ApiClient.post(apis.auth.LOGIN, payload)
}

export const logout = () => {
  return ApiClient.put(apis.auth.LOGOUT)
}

export const getUser = () => {
  return ApiClient.get(apis.auth.GET_USER_INFO)
}
