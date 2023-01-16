export interface ResponseData<T> {
  status: number
  code: number
  message: string
  data: T
}

export interface IEvent {
  id?: number
  name?: string
}
export interface Idata<T> {
  page: number
  limit: number
  totalItemCount: number
  data: T
}
export interface IfieldData {
  name?: string
  phone?: string
  provinceName?: string
  districtName?: string
  wardName?: string
  dob?: string
  identityCard?: string
  job?: string
}
export interface ICustomerInfo {
  name: string
  phone: string
  provinceID: number
  districtID: number
  wardID: number
  dob: Date
  gender: number
  identityNumber?: string
  job: string
  totalPrice: number
  eventID: number
  eventChannelID?: number
  listBill?: ListBill[]
}

export interface ListBill {
  code?: string
  price?: number
  stallID?: number
}

export interface IDataUpdateCusomer {
  name: string
  id: number
}
