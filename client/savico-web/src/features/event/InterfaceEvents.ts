export interface ResponseData<T> {
  status: number
  code: number
  message: string
  data: T
}
export interface Idata<T> {
  page: number
  limit: number
  totalItemCount: number
  data: T
}
export interface IListEventPayload {
  page?: number
  limit?: number
  searchKey?: string
  status?: number
  fromDate?: string
  toDate?: string
}
export interface IUpdateEventPayload {
  id?: number
  userID?: number
  title: string
  content: string
  urlImage: string
  startDate: Date
  endDate: Date
  isNotify: number
  isPopup: number
  point: number
  orderMinValue: number
  giftQuantity?: number
  giftID?: string[]
  listRelatedStall?: number[]
}

export interface IListStall {
  id: number
  name: string
  code: string
  floor: number
  phone: string
  logo: string
  status: number
  categoryID: number
  categoryName: string
  createdDate: string
}
