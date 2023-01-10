export interface INMessage {
  type?: 'success' | 'info' | 'error' | 'warning'
  content: string
  duration?: number
}
