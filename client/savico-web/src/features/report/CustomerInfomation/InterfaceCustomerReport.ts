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

export interface IListPercentResident {
  id?: number
  percent?: number
  name: string
}

export interface IFMListPercentResident extends IListPercentResident {
  percent?: number
  y?: number
  name: string
}

export interface IDataChart {
  name: string
  percent?: number
}

export interface IDataGenderChart {
  genderID?: number
  gender: any
  percent?: number
}

export interface IDataSumCustomer {
  date: string
  week: null
  amount: number
  listCustomerWeek: ListCustomerWeek[]
  listCustomerWeekCompare: ListCustomerWeekCompare[]
}

export interface ListCustomerWeek {
  time: string
  amount: number
}

export interface IDataChart {
  name: string
  data: Array<any>
}

export interface ListCustomerWeekCompare {
  time: string
  amountCompare: number
}
