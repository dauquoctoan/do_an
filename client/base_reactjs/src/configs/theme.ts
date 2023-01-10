import { ConfigProvider } from 'antd'

export interface IColor {
  primaryColor: string
  successColor: string
  warningColor: string
  errorColor: string
  infoColor: string
  processingColor: string
}

export const COLOR:IColor = {
  primaryColor: '#08979c',
  successColor: '#52c41a',
  warningColor: '#fadb14',
  errorColor: '#f5222d',
  infoColor: '#7cb305',
  processingColor: '#722ed1',
}

ConfigProvider.config({
  theme: {
    primaryColor: COLOR.primaryColor,
    successColor: COLOR.successColor,
    warningColor: COLOR.warningColor,
    errorColor: COLOR.errorColor,
    infoColor: COLOR.infoColor,
    processingColor: COLOR.processingColor,
  },
})

export default ConfigProvider
