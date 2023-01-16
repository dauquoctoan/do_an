export interface ISizeAnt {}
export interface IPagination {
  limit: number
  page: number
  total: number
}

export interface IPaging {
  total: number
  current: number
  pageSize: number
}

export interface IDefaultFileList {
  uid: string
  name: string
  status: 'done'
  url: string
}
