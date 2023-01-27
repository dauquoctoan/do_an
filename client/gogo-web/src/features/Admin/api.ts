import { ApiClient } from '../../services'
import {
  IChangeHisPayload,
  IChangeHistory,
  IHisPointDetail,
  IHistoryPointPayload,
  IListHistoryPoint,
  ResponseData,
} from './interface'

export const createAUser = (payload: any) => {
  return ApiClient.post('/a-user', payload)
}
export const updateAUser = (payload: any) => {
  return ApiClient.put('/a-user', payload)
}
export const getAUsers = (payload: any) => {
  return ApiClient.get('/a-users', payload)
}
export const changeStatusAUser = (payload: any) => {
  return ApiClient.patch('/a-user', payload)
}
export const deleteAUser = (payload: any) => {
  return ApiClient.delete('/a-user', payload)
}
/* new */

export const getHistoryOfPoints = (
  payload: IHistoryPointPayload
): Promise<ResponseData<IListHistoryPoint[]>> => {
  return ApiClient.get(`/MemberPointHistory/GetListPointHistory`, payload)
}

export const getHistoryOfPointsDetail = (
  id?: number
): Promise<ResponseData<IHisPointDetail[]>> => {
  return ApiClient.get(`MemberPointHistory/GetPointHistoryDetail/${id}`)
}

export const getHistoryExchangePoints = (
  payload: IChangeHisPayload
): Promise<ResponseData<IChangeHistory[]>> => {
  return ApiClient.get('/MemberPointHistory/GetListChangeHistory', payload)
}

export const exportExcel = () => {
  return ApiClient.get('/Customer/ExportExcelZaloOA')
}

export const getBillList = (payload: any) => {
  return ApiClient.get(
    `/Statistic/GetEventParticipantDetail?ID=${payload?.id}&page=${payload?.page}&limit=10`
  )
}
