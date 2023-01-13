import { message as ms } from 'antd'
import { COLOR } from '../../configs/theme'
import R from '../../utils/R'
import { INMessage } from './interface'

const { MessageSuccess, MessageWarning, MessageError, MessageInfo } = R.icons

const message = ({ type = 'success', content, duration = 1 }: INMessage) => {
  ms.config({
    top: 10,
    duration: duration,
    maxCount: 3,
    rtl: true,
  })

  switch (type) {
    case 'info':
      ms.info({
        content,
      })
      break
    case 'error':
      ms.error({
        content,
      })
      break
    case 'success':
      ms.success({
        content,
      })
      break
    case 'warning':
      ms.warning({
        content,
      })
      break
  }
}

export default message
