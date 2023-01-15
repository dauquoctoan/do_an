export interface ResponseData<T> {
  status: number
  code: number
  message: string
  data: {
    page?: number
    limit?: number
    total?: number
    data?: T
  }
}

export interface ResponseDataDetail<T> {
  status: number
  code: number
  message: string
  data: T
}

export interface IVoucherAndGiftPayload {
  page?: number
  limit?: number
  searchKey?: string
  type?: number
  fromDate?: string
  toDate?: string
}
export interface IVoucherAndGift {
  id: number
  name: string
  point: number
  type: number
  number: number
  createDate: string
  status: number
  description: string
  fromDate: string
  toDate: string
  urlImage?: string
  quantity?: number
}

export interface IFormatedVoucherAndGift extends IVoucherAndGift {
  key: number
  index: number
}

export interface IVoucherAndGiftDetail {
  name: string
  point: number
  quantity: number
  fromDate: string
  toDate: string
  type: number
  createDate: string
  status: number
  description: string
  urlImage: string
  listGiftCode: IlistGiftCode[]
}

interface IlistGiftCode {}

export interface IAddVoucherAndGiftPayload {
  name: string
  point: number
  type: number
  createDate?: string
  status?: number
  description: string
  urlImage?: string
  number: number
  quantity?: number
  fromDate?: string
  toDate?: string
}
export interface IVoucherAndGiftUpdatePayload {
  name: string
  point: number
  type: number
  createDate: string
  status: number
  description: string
  urlImage: string
  number: number
  fromDate: string
  toDate: string
  id: number
}

export interface IListGiftCodePayload {
  page: number
  limit: number
  GiftID: number
  searchKey?: string
  status?: number
}

export interface IListGiftCode {
  id: number
  code: string
  status: number
}

export interface IFormatedListGiftCode extends IListGiftCode {
  key: number
  index: number
}

export interface ICreateGiftCodePayload {
  code: string
  giftID: number
}

export interface IUpdateGiftCodePayload {
  id: number
  code: string
}
