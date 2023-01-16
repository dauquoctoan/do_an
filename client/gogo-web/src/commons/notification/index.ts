import { notification as nt } from 'antd'
import { IPropNotification } from './interface'

nt.config({
  duration: 3,
  maxCount: 1,
})

const notification = {
  success: (desc: string, mes: string) => {
    nt.success({
      description: desc,
      message: mes,
      className: 'notification-error',
    })
  },
  warn: (desc: string, mes: string) => {
    nt.warn({
      description: desc,
      message: mes,
      className: 'notification-error',
    })
  },
  error: (desc: string, mes: string) => {
    nt.error({
      description: desc,
      message: mes,
      className: 'notification-error',
    })
  },
  info: (desc: string, mes: string) => {
    nt.info({
      description: desc,
      message: mes,
      className: 'notification-error',
    })
  },
}

export default notification
