import { FormInstance } from 'antd'

export interface iAutoComplete {
  onSelected?: (key: number | number[]) => void
  path: string
  method: 'get' | 'post' | 'put' | 'delete'
  placeholder: string
  option_key: string
  option_value: string
  form: FormInstance
  name: string
  mode: 'multiple' | 'single'
  rules?: IRules[]
  wrapperCol: any
  labelCol: any
  label: string
  defaultOptions?: any
}

export interface IRules {
  required: boolean
  pattern?: RegExp
  message: string
}

export interface IOptions {
  key: number
  value: string
}
