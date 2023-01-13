import { ApiClient } from 'services'
import { ISumBillOrder, ResponseData } from './InterfaceStallInfo'

export const getSumBillStall = (
  TypeOrder: number,
  EventID?: number
): Promise<ResponseData<ISumBillOrder[]>> => {
  return ApiClient.get('/Statistic/GetSumBillStall', { TypeOrder, EventID })
}

export const getSumBillCategory = (
  TypeOrder: number,
  EventID?: number
) => {
  return ApiClient.get('/Statistic/GetSumBillCategory', { TypeOrder, EventID })
}

export const getTotalGiftBills = (payload: any) => {
  return ApiClient.get(`/Statistic/GetTotalGiftBills`, payload)
}

export const getTotalExchangedBill = (payload: any) => {
  return ApiClient.get(`/Statistic/GetCountGiftBills`, payload)
}


