import { ApiClient } from 'services'
import {
  IAddress,
  ICreateStaffPayload,
  Idata,
  IListStaff,
  IListStaffPayload,
  IUpdateStaffPayload,
  ResponseData,
} from './StaffInterface'

export const getUsers = (payload: any) => {
  return ApiClient.get(`/users`, payload)
}
//old

export const getListStaff = (
  payload: IListStaffPayload
): Promise<ResponseData<Idata<IListStaff[]>>> => {
  return ApiClient.get(`/Staff/GetListStaff`, payload)
}

export const CreateStaff = (
  payload: ICreateStaffPayload
): Promise<ResponseData<any>> => {
  return ApiClient.post(`/Staff/CreateStaff/`, payload)
}

export const UpdateStaff = (
  payload: IUpdateStaffPayload
): Promise<ResponseData<any>> => {
  return ApiClient.post(`/Staff/UpdateStaff/`, payload)
}

export const deleteStaff = (id: number): Promise<ResponseData<any>> => {
  return ApiClient.post(`/Staff/DeleteStaff/${id}`, id)
}

export const changeStatus = (id: number): Promise<ResponseData<any>> => {
  return ApiClient.post(`/Staff/ChangeStatus/${id}`, id)
}

export const getListProvince = (): Promise<ResponseData<IAddress[]>> => {
  return ApiClient.get(`/Address/GetListProvince`, {})
}

export const getListDistrict = (
  provinceID: number
): Promise<ResponseData<IAddress[]>> => {
  return ApiClient.get(`/Address/GetListDistrict`, { provinceID })
}

export const getListWard = (
  districtID: number
): Promise<ResponseData<IAddress[]>> => {
  return ApiClient.get(`/Address/GetListWard`, { districtID })
}
