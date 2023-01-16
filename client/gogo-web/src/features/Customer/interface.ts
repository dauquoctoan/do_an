export interface ResponseData<T> {
  status: number
  code: number
  message: string
  data: {
    page?: number
    limit?: number
    totalItemCount?: number
    data: T
  }
}
export interface IFormatedPaging {
  total: number
  current: number
  pageSize: number
}
export interface IHistoryPointPayload {
  page: number
  limit: number
  type?: number
  customerID: number
  EventName: string
  fromDate?: string
  toDate?: string
}
export interface IListHistoryPoint {
  id: number
  eventName: string
  eventID: number
  customerID: number
  customerName: string
  listBill: string[]
  someBill: number
  point: number
  balance: number
  cusPoint: number
  createDate: string
}

export interface IFormatedHisPoint extends IListHistoryPoint {
  index: number
  key: number
}
export interface ICustomerDetail {
  districtName: string
  dob: string
  id: number
  identityCard: string
  job: string
  name: string
  phone: string
  point: number
  provinceName: string
  wardName: string
}

export interface IHisPointDetail {
  id: number
  code: string
  image: string
  price: number
  status: number
  stallName: string
}

export interface IFormatedHisPointDetail extends IHisPointDetail {
  key: number
  index: number
  totalMoney?: any
}

export interface IChangeHisPayload {
  page: number
  limit: number
  type?: number
  customerID?: number
  searchKey?: string
  fromDate?: string
  toDate?: string
}

export interface IChangeHistory {
  id: number
  giftName: string
  giftID: number
  type: number
  point: number
  balance: number
  createDate: string
}

export interface IFormatedChangeHistory extends IChangeHistory {
  key: number
  index: number
}
