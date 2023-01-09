export interface IPropsUpload {
  name: string
  listType?: 'picture-card' | 'picture' | 'text'
  title: 'Tải ảnh' | 'Tải video' | 'Tải file'
  accept?:
    | '.png,.jpg,.jpeg,.psd,.gif,.eps,.tiff,.svg,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    | '.png,.jpg,.jpeg,.psd,.gif,.eps,.tiff,.svg'
    | '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  size?: number
  maxCount?: number
  changeListPath?: (p: string[]) => void
  action: string
}

export interface IFileBeforeUpload {
  uid: string
  lastModified?: number
  lastModifiedDate?: any
  name?: string
  size: number
  type?: string
  webkitRelativePath?: string
  status?: string
}
