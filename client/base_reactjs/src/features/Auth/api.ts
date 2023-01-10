import { PATH_API } from '../../configs/api'
import { ApiClient } from '../../services'

export const login = (payload: any) => {
  return ApiClient.put(PATH_API.login, payload)
}

export const logout = () => {
  return ApiClient.put(PATH_API.logout)
}

export const getUser = () => {
  return ApiClient.get(PATH_API.getUserInfo)
}
