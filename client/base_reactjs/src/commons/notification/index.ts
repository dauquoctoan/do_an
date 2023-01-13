import { notification as nt } from 'antd'

nt.config({
  duration: 5,
  maxCount: 1,
})

const notification = {
  success: (mesg: string, desc: string) => {
    nt.success({
      description: desc,
      message: mesg,
      className: 'notification-success',
    })
  },
  warning: (mesg: string, desc: string) => {
    nt.warning({
      description: desc,
      message: mesg,
      className: 'notification-success',
    })
  },
  error: (mesg: string, desc: string) => {
    nt.error({
      description: desc,
      message: mesg,
      className: 'notification-success',
    })
  },
}

export default notification
