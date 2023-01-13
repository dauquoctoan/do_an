import { ApiClient } from 'services'
import {
  IAddVoucherAndGiftPayload,
  ICreateGiftCodePayload,
  IListGiftCode,
  IListGiftCodePayload,
  IUpdateGiftCodePayload,
  IVoucherAndGift,
  IVoucherAndGiftDetail,
  IVoucherAndGiftPayload,
  IVoucherAndGiftUpdatePayload,
  ResponseData,
  ResponseDataDetail,
} from './interface'

export const getListVoucherAndGift = (
  payload: IVoucherAndGiftPayload
): Promise<ResponseData<IVoucherAndGift[]>> => {
  return ApiClient.get('/Gift/GetListGift', payload)
}

export const VoucherAndGiftDetail = (
  id: number
): Promise<ResponseDataDetail<IVoucherAndGiftDetail>> => {
  return ApiClient.get(`/Gift/GetGiftDetail/${id}`)
}

export const VoucherAndGiftAdd = (
  payload: IAddVoucherAndGiftPayload
): Promise<ResponseDataDetail<null>> => {
  return ApiClient.post('Gift/CreateGift', payload)
}

export const VoucherAndGiftUpdate = (
  payload: IVoucherAndGiftUpdatePayload
): Promise<ResponseDataDetail<null>> => {
  return ApiClient.post('/Gift/UpdateGift', payload)
}

export const VoucherAndGiftDelete = (
  id: number
): Promise<ResponseDataDetail<null>> => {
  return ApiClient.post(`/Gift/DeleteGift/${id}`, id)
}

export const VoucherAndGiftChangeStatus = (
  id: number
): Promise<ResponseDataDetail<null>> => {
  return ApiClient.post(`/Gift/ChangeStatus/${id}`, id)
}

export const uploadImage = (
  payload: number
): Promise<ResponseDataDetail<any>> => {
  return ApiClient.post(`/Upload/UploadImage`, payload)
}

export const getListGiftCode = (
  payload: IListGiftCodePayload
): Promise<ResponseData<IListGiftCode[]>> => {
  return ApiClient.get(`/Gift/GetListGiftCode`, payload)
}

export const createGiftCode = (
  payload: ICreateGiftCodePayload
): Promise<ResponseDataDetail<any>> => {
  return ApiClient.post(`/Gift/CreateGiftCode`, payload)
}

export const updateGiftCode = (
  payload: IUpdateGiftCodePayload
): Promise<ResponseDataDetail<any>> => {
  return ApiClient.post(`/Gift/UpdateGiftCode`, payload)
}

export const deleteGiftCode = (
  id: number
): Promise<ResponseDataDetail<any>> => {
  return ApiClient.post(`/Gift/DeleteGiftCode/${id}`, id)
}

export const getImportPattern = () => {
  return ApiClient.get(`/Gift/ImportVoucherCode`)
}

export const postExcelFile = (GiftID: number, file: any) => {
  const formData = new FormData()
  formData.append('GiftID', GiftID.toString())
  formData.append('file', file)

  return ApiClient.post(`/Gift/ImportVoucher`, formData)
}
