import { ApiClient } from 'services'
import {
  Idata,
  IListUsageFrequency,
  IUsageFrequencyPayload,
  ResponseData,
} from './InterfaceUsageFrequency'

export const getListUsageFrequency = (
  payload: IUsageFrequencyPayload
): Promise<ResponseData<Idata<IListUsageFrequency[]>>> =>
  ApiClient.get('/Statistic/GetListUsageFrequency', payload)
