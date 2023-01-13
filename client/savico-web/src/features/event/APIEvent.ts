import { apis } from 'configs/api'
import {
  IVoucherAndGift,
  IVoucherAndGiftPayload,
} from 'features/VoucherAndGif/interface'
import { ApiClient } from 'services'
import {
  Idata,
  IListEventPayload as IListEventPayload,
  IListStall,
  IUpdateEventPayload,
  ResponseData,
} from './InterfaceEvents'

export const getListEvent = (payload: IListEventPayload) => {
  return ApiClient.get('/Event/GetListEvent', payload)
}

export const detailEvent = (payload: IUpdateEventPayload) => {
  return ApiClient.post('/Event/GetEventDetail', payload)
}

export const createEvent = (payload: IUpdateEventPayload) => {
  return ApiClient.post('/Event/CreateEvent', payload)
}

export const updateEvent = (payload: IUpdateEventPayload) => {
  return ApiClient.post('/Event/UpdateEvent', payload)
}

export const deleteEvent = (id: number) => {
  return ApiClient.post('/Event/DeleteEvent/' + id, {})
}

export const changeStatusEvent = (id: number) => {
  return ApiClient.post('/Event/ChangeStatus/' + id, {})
}

export const getEventDetail = (id: number) => {
  return ApiClient.get(`/Event/GetEventDetail/${id}`, {})
}

export const getStalls = (
  payload: any
): Promise<ResponseData<Idata<IListStall[]>>> => {
  return ApiClient.get(apis.stall.GET_STALLS, payload)
}

export const getListVoucherAndGift = (
  payload: IVoucherAndGiftPayload
): Promise<ResponseData<Idata<IVoucherAndGift[]>>> => {
  return ApiClient.get('/Gift/GetListGift', payload)
}
