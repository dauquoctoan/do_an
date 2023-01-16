import { apis } from '../../configs/api'
import { ApiClient } from '../../services'
import {
  IChangeHisPayload,
  IChangeHistory,
  IHisPointDetail,
  IHistoryPointPayload,
  IListHistoryPoint,
  ResponseData,
} from './interface'

export const getCustomers = (payload: any) => {
  return ApiClient.get(apis.customer.GET_CUSTOMERS, payload)
}

export const getCustomerDetail = (payload: any) => {
  return ApiClient.get(
    apis.customer.GET_CUSTOMER_DETAIL.concat(`/${payload.id}`),
    payload
  )
}

export const ChangeStatusCustomer = (payload: any) => {
  return ApiClient.post(
    apis.customer.CHANGE_STATUS_CUSTOMER.concat(`/${payload.ID}`),
    {}
  )
}

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
  return ApiClient.get(`/Statistic/GetEventParticipantDetail?ID=${payload?.id}&page=${payload?.page}&limit=10`)
}
