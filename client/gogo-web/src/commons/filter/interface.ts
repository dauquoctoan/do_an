import type { RangePickerProps } from 'antd/es/date-picker'

export interface IDataSelect {
  [key: string]: string
}
export interface ISelect {
  placeholder: string
  key: string
  data: IDataSelect
  width?: number
  showSearch?: boolean
}

export interface IPropFilter {
  search?: {
    placeholder: string
    width?: number
  }
  selectOriginCustomer?: any
  select?: ISelect[]
  datePicker?: {
    width?: number
    disabledDate?: RangePickerProps['disabledDate']
    future?: boolean
  }
  // onChangeFilter?: (c: IListFilter) => void
  onChangeFilter?: (C: any) => void
  size?: 'large' | 'middle' | 'small'
  totalItem?: {
    total?: number
    desc?: string
    style?: React.CSSProperties
    suffix?: string
  }
  button?: {
    title: string
    onClick: () => void
    type: 'add' | 'delete'
    width?: number
  }
}

export interface IListFilter {
  searchKey?: string | null
  autoComplete?: string | number | null
  fromDate?: string | null
  toDate?: string | null
  select?: string | number | null
  originCustomer?: number | null
}

export interface IPropSelect {
  keyName: string
  placeholder: string
  data: IDataSelect | undefined
  setFilter: (e: any) => void
  listFilter: IListFilter
  size?: 'large' | 'middle' | 'small'
  width?: number
  showSearch?: boolean
}
