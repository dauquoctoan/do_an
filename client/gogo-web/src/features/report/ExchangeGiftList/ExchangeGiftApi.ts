import { ApiClient } from 'services'

export const getExchangeGiftList = (payload: any) =>
  ApiClient.get('/Statistic/StatisticsGiftExchange', payload)

export const getExchangeGifDetail = (payload: any) =>
  ApiClient.get('/Statistic/GetNumberOfGiftExchangeDetail', payload)

export const getVoucherDetail = (payload: any) =>
  ApiClient.get('/Statistic/GetGiftVoucherDetail', payload)
