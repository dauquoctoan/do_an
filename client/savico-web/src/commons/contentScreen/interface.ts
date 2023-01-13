import { ReactNode } from 'react'

export interface IPropsContentScreen {
  children: ReactNode
  sizeSpin?: 'default' | 'large' | 'small'
  loading?: boolean
  countFilter?: number
  logo?: boolean
}
export interface IWrapperContentStyled {
  loading: 'true' | 'false'
}
