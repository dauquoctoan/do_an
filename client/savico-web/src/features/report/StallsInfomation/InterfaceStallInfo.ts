export interface ResponseData<T> {
  status: number
  code: number
  message: string
  data: T
}
export interface Idata<T> {
  page: number
  limit: number
  total: number
  data: T
}

export interface IFormatData {
  name: string
  y: number
}

export interface ISumBillOrder {
  stallID: number
  name: string
  sumBill: number
}
