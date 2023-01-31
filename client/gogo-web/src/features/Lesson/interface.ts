import { IFile } from '../../commons/uploads/interface'

export interface IAnswer {
  title: string
  picture: string
}
export interface IFormContent {
  title: string
  level: number
  options: IAnswer[]
  answers?: []
  answer?: []
}
export interface IDetailNews extends IForm {
  startDate?: string
  endDate?: string
  isHighlightNews?: boolean
  date?: [any, any]
}
export interface IForm {
  userID?: number
  id?: number
  title: string
  typePost: number
  isBanner: number
  content: string
  urlImage: any
  status: number
  type: number
  listRelatedStall: number[]
  startDate?: string
  endDate?: string
  IsPopup?: number
  ListGiftNews?: any[]
  listVoucher?: any[]
  index?: number
  IsNotify?: number
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

export interface INews {
  id: number
  title: string
  type: number
  typePost: number
  content: string
  urlImage: string
  startDate: string
  endDate: string
  status: number
}
