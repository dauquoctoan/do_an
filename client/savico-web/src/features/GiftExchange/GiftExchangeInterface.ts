export interface ResponseData<T> {
  status: number
  code: number
  message: string
  data: {
    page: number
    limit: number
    total: number
    data: T
  }
}
export interface IExchangeGiftPayload {
  page: number
  limit: number
  searchKey?: string
  type?: number
  fromDate?: string
  toDate?: string
}
export interface IListExchangeGift {
  id: number
  giftID: number
  giftName: string
  customerID: number
  customerName: string
  type: number
  point: number
  createDate: string
}
export interface IFormatedListExchangeGift extends IListExchangeGift {
  key: number
  index: number
}
