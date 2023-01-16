import { apis } from '../../configs/api'
import { ApiClient } from '../../services'

export const getStalls = (payload: any) => {
  return ApiClient.get(apis.stall.GET_STALLS, payload)
}
export const getDataTypeStalls = () => {
  return ApiClient.get(apis.stall.CATEGORY)
}

export const createTypeStalls = (payload: any) => {
  return ApiClient.post(apis.stall.CREATE_STALL, payload)
}

export const detailTypeStalls = (payload: any) => {
  return ApiClient.get(apis.stall.DETAIL_STALL.concat(payload.ID), {})
}

export const deleteStall = (payload: any) => {
  const Path = apis.stall.DELETE_STALL.concat(`/${payload.ID}`)
  return ApiClient.post(Path, {})
}

export const changeStatusStall = (payload: any) => {
  return ApiClient.post(apis.stall.CHANGE_STATUS_STALL.concat(payload.ID), {})
}

export const updateStall = (payload: any) => {
  return ApiClient.post(apis.stall.UPDATE_STALL, payload)
}
