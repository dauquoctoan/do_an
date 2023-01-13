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

export interface IUsageFrequencyPayload {
  page?: number
  limit?: number
  searchKey?: string
  fromDate?: string
  toDate?: string
}

export interface IListUsageFrequency {
  name: string
  phone: string
  averageTime: number
  sumEventClick: number
  sumNewsClick: number
  listJoinDay: IListJoinDay[]
}

export interface IListJoinDay {
  useDate: string
  useDuration: number
  eventClick: number
  newsClick: number
}

export interface IFormatedListUsageFrequency extends IListUsageFrequency {
  index: number
  key: number
}
