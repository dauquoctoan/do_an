import { FormInstance } from 'antd/es/form'

export interface DataType {
  stt: string
  id: number
  idStalls: string
  nameStalls: string
  position: string
  contact: string
  bank: string
  status: number
}

export interface ILoadingChecked {
  loading: boolean
  id: number | null
}

export interface IStalls {
  categoryID: number
  code: string
  floor: number
  id: number
  logo: string
  name: string
  phone: string
  status: string
}
export interface IFormAddEditStalls {
  name: string
  code?: string
  floor: number
  phone: string
  linkWeb: string
  linkFB: string
  logo: any
  description: string
  status?: number
  categoryID: number
  listPromotionID?: number[]
  listPromotion?: number[]
  index: number
}
export interface ICategory {
  name: string
  id: number
  status: number
}
