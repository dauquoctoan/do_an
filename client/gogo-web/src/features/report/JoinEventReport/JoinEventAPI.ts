import { ApiClient } from 'services'
import {
  ICounCustomerDetail,
  ICountCustomerDetailPayload,
  Idata,
  IListNewCusPayload,
  IListNewCustomer,
  ResponseData,
} from './JoinEventInterface'

export const getListNewCustomer = (
  payload: IListNewCusPayload
): Promise<ResponseData<Idata<IListNewCustomer[]>>> =>
  ApiClient.get('/Customer/GetListNewCustomer', payload)

export const getListNewCustomerDetail = (
  payload: ICountCustomerDetailPayload
): Promise<ResponseData<Idata<ICounCustomerDetail[]>>> =>
  ApiClient.get('/Customer/CustomerEventDetail', payload)
