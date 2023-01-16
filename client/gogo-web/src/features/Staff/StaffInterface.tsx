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
export interface IFilters {
  searchKey?: string
  status?: number
  searchProvince?: number
}
export interface IListStaffPayload {
  page?: number
  limit?: number
  status?: number
  searchKey?: string
  searcProvince?: number
}
export interface IListStaff {
  id: number
  name: string
  address: string
  phone: string
  provinceName: string
  provinceID: number
  districtName: string
  districtID: number
  wardName: string
  wardID: number
  gender: number
  email: string
  status: number
  createDate: string
  dob: string
}

export interface IFormatedListStaff extends IListStaff {
  key: number
  index: number
}

export interface ICreateStaffPayload {
  name: string
  phone: string
  wardID: number
  districtID: number
  provinceID: number
  gender: number
  dob: string
  address: string
}

export interface IUpdateStaffPayload {
  id: number
  name: string
  wardID: number
  districtID: number
  provinceID: number
  gender: number
  dob: string
  address: string
}

export interface IAddress {
  code: number
  name: string
  type: string
  provinceID?: number
  districtID?: number
}
