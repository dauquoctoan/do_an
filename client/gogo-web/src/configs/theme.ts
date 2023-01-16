import { ConfigProvider } from 'antd'
export interface IColor {
  primaryColor: string
  successColor: string
  warningColor: string
  errorColor: string
  infoColor: string
  processingColor: string
  menuDark: string
  menuLight: string
}

export const COLOR: IColor = {
  primaryColor: '#08979c',
  successColor: '#52c41a',
  warningColor: '#fadb14',
  errorColor: '#f5222d',
  infoColor: '#7cb305',
  processingColor: '#722ed1',
  menuDark: '#1b2635',
  menuLight: 'white',
}

ConfigProvider.config({
  theme: {
    primaryColor: COLOR.primaryColor,
    successColor: COLOR.primaryColor,
    // successColor: COLOR.successColor,
    warningColor: COLOR.warningColor,
    errorColor: COLOR.errorColor,
    infoColor: COLOR.infoColor,
    processingColor: COLOR.processingColor,
  },
})

/* Exporting the default export of the ConfigProvider module. */
export default ConfigProvider
