import { ApiClient } from 'services'
import {
  IDataChart,
  IDataGenderChart,
  IDataSumCustomer,
  IListPercentResident,
  ListCustomerWeek,
  ResponseData,
} from './InterfaceCustomerReport'

export const getListPercentDistrict = (EventID?: number): Promise<
  ResponseData<IListPercentResident[]>
> => {
  return ApiClient.get('/Statistic/GetListPercentageCustomer', {EventID})
}

export const getListPercentPrivinces = (EventID?: number): Promise<
  ResponseData<IDataChart[]>
> => {
  return ApiClient.get('/Statistic/GetListCustomerPercentageProvinces', {EventID})
}

export const getListCustomerPercentageAge = (EventID?: number): Promise<
  ResponseData<IDataChart[]>
> => {
  return ApiClient.get('/Statistic/GetListCustomerPercentageAge', {EventID})
}

export const getListPercentageGenderCustomer = (EventID?: number): Promise<
  ResponseData<IDataGenderChart[]>
> => {
  return ApiClient.get('/Statistic/GetListPercentageGenderCustomer', {EventID})
}

export const getListCustomerChannelPercentage = (EventID?: number): Promise<
  ResponseData<IListPercentResident[]>
> => {
  return ApiClient.get('/Statistic/GetListCustomerChannelPercentage', {EventID})
}

export const getSumCustomerJoinEvent = (payload: {
  fromDate?: any
  toDate?: any
}): Promise<ResponseData<IDataSumCustomer>> => {
  return ApiClient.get('/Statistic/GetListSameFilter', payload)
}

export const getSumCustomerJoinEventById = (payload: {
  ID: number
})=> {
  return ApiClient.get('/Statistic/GetCustomerCampaign', payload)
}

export const getCountCustomerByDay = (payload: {fromDate: string, toDate: string}) => {
  return ApiClient.get('/Statistic/FilterEventParticipant', payload)
}

export const getCountCustomerByEveryTime = (payload: {
  fromDate: string
  toDate: string
}): Promise<ResponseData<ListCustomerWeek[]>> => {
  return ApiClient.get(
    '/Statistic/GetListParticipantsStatisticsEventDay',
    payload
  )
}
