import { notification as nt } from 'antd'
import { IPropNotification } from './interface'

const notification = ({
  placement,
  description,
  type = 'success',
  message,
  maxCount = 3,
  duration = 1,
}: IPropNotification) => {
  nt.config({
    placement: placement,
    duration: duration,
    maxCount: maxCount,
  })
  switch (type) {
    case 'info':
      nt.info({
        description: description,
        message: message,
        className: 'notification-info',
      })
      break
    case 'error':
      nt.error({
        description: description,
        message: message,
        className: 'notification-error',
      })
      break
    case 'success':
      nt.success({
        description: description,
        message: message,
        className: 'notification-success',
      })
      break
    case 'warning':
      nt.warning({
        description: description,
        message: message,
        className: 'notification-warning',
      })
      break
  }
}

export default notification
