import { FormInstance, FormItemProps } from 'antd'

export interface IFile {
  lastModified: number
  uid: any
  lastModifiedDate: string
  name: string
  status?: 'done' | 'error' | 'uploading'
  url?: string
  response?: { data: string[] }
}

export interface IProps extends FormItemProps {
  type?: 'picture' | 'text' | 'picture-card' | undefined
  limit?: number
  nameUpload?: string
  path?: string
  size?: number
  placeholder?: string | React.ReactNode
  accept?: '.jpg, .png' | '.mp4'
  minSecondDuration?: number
  maxSecondDuration?: number
  isDisplayImgError?: boolean
  isMultiple?: boolean
  onRemove?: () => any
  defaultData?: IFile[]
  logger?: (data: IFile[]) => any
  setFileListProps?: (fn: Function) => any
  form?: FormInstance
}
