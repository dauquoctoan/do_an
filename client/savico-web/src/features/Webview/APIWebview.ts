import { apis } from 'configs/api'
import { ApiClient } from 'services'
import { ICustomerInfo, IEvent, ResponseData } from './interfaceWebview'

export const CustomerInfo = (
  payload: ICustomerInfo
): Promise<ResponseData<string>> =>
  ApiClient.post('/EventParticipant/CreateQRCode', payload)

export const getStalls = () => {
  return ApiClient.get('/EventParticipant/GetListStall', {})
}

export const getChanels = () => {
  return ApiClient.get('/EventParticipant/GetListEventChannel', {})
}

export const getEvents = (): Promise<ResponseData<IEvent[]>> => {
  return ApiClient.get('/EventParticipant/GetListEvent', {})
}
