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

export interface IListNewCustomer {
  id: number
  name: string
  number: number
  fromDate: string
  toDate: string
}

export interface IFormatedListNewCustomer extends IListNewCustomer {
  key: number
  index: number
}

export interface ICounCustomerDetail {
  id: number
  name: string
  phone: string
  createdDate: string
}

export interface IFormatedDetailCountCustomer extends ICounCustomerDetail {
  key: number
  index: number
}

export interface IListNewCusPayload {
  page: number
  limit: number
  searchKey?: string
  fromDate?: string
  toDate?: string
}

export interface ICountCustomerDetailPayload {
  id: number
  page: number
  limit: number
  searchKey?: string
  fromDate?: string
  toDate?: string
}
