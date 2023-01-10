export interface IPropNotification {
  placement?:'bottom'|'bottomLeft'|'bottomRight'|'top'|'topLeft'|'topRight'
  type?: 'success' | 'info' | 'error' | 'warning'
  message:string
  description:string
  duration?: number
  maxCount?: number
}
