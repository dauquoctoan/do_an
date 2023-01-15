import { message as ms } from 'antd'
import { COLOR } from '../../configs/theme'
import R from '../../utils/R'
import { INMessage } from './interface'

const { MessageSuccess, MessageWarning, MessageError, MessageInfo } = R.icons

ms.config({
  top: 10,
  duration: 2,
  maxCount: 3,
  rtl: true,
})

const message = {
  info: (content: string) => {
    ms.info({
      content,
    })
  },
  success: (content: string) => {
    ms.success({
      content,
    })
  },
  error: (content: string) => {
    ms.error({
      content,
    })
  },
  warn: (content: string) => {
    ms.warn({
      content,
    })
  },
}
export default message
