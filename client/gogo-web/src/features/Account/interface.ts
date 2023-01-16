import { FormInstance } from 'antd/es/form'

export interface IPropAddEdit {
  accountDetail?: IFormAddUpdateAccount | null
  handleCloseModal: () => void
  form: FormInstance
}

export interface IAccount {
  id: number
  username: string
  phone: string
  roleName: string
  roleID: number
  email: string
  status: number
  createdDate: string
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
