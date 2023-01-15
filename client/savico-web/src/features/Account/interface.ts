import { FormInstance } from 'antd/es/form'

export interface IPropAddEdit {
  accountDetail?: ITopics | null
  handleCloseModal: () => void
  form: FormInstance
}

export interface ITopics {
  _id: string
  name: string
  desc?: string
  picture: string
}

export interface IFormAddUpdateAccount {
  id?: number
  name: string
  phone: string
  email: string
  password?: string
  role: number
  status?: number
}

export interface ILoadingSwitch {
  loading: boolean
  id: number
}
