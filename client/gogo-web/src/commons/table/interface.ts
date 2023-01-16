import { ReactNode } from 'react'
import { JsxElement } from 'typescript'
import { IPagination } from '../../interface'

export interface IPropTable {
  pagination?: IPagination
  onChangePram?: (e: number) => void
  data: any
  columns: any
  size?: 'large' | 'middle' | 'small'
  expandedRowRender?: (record: any) => ReactNode
  rowSelection?: any
  doubleClickRow?: (e: any) => void
  border?: boolean
}

export interface DataType {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}
