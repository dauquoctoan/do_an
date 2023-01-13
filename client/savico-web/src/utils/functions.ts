import { Rule } from 'antd/lib/form'
import { validHeadPhoneNumber } from 'utils/funcHelper'

export function renderText(_value: string | undefined | null): string {
  if (_value) {
    return _value
  } else {
    return '--'
  }
}

export const errorWhiteSpace = () => ({
  validator(_: Rule, value: string) {
    if (/\s/g.test(value)) {
      return Promise.reject(new Error('Vui lòng không nhập khoảng trắng'))
    }
    return Promise.resolve()
  },
})

export const errorText = (text: string) => ({
  validator(_: Rule, value: string) {
    if (value == '' || value == null) {
      return Promise.reject(new Error(`Vui lòng nhập ${text}`))
    } else if (value.match(/[a-z]/i)) {
      return Promise.reject(new Error(`${text} không hợp lệ`))
    } else {
      return Promise.resolve()
    }
  },
})

export const errorNumber = (text: string) => ({
  validator(_: Rule, value: string) {
    if (/\d/.test(value)) {
      return Promise.reject(new Error(`${text} không hợp lệ`))
    }
    return Promise.resolve()
  },
})

export const validPhoneNumber = (tmp: any, value: string) => {
  let trimValue: string = ''
  if (value) {
    trimValue = value.trim()
  }
  const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im // validate phone number
  let validPhone: boolean = true
  if (trimValue && trimValue.length < 10 && trimValue.includes('84')) {
    validPhone = false
  } else if (trimValue && trimValue.length < 11 && trimValue.includes('+84')) {
    validPhone = false
  }

  if (
    trimValue === '' ||
    trimValue === null ||
    (reg.test(trimValue) && validHeadPhoneNumber(trimValue) && validPhone)
  ) {
    return Promise.resolve()
  }
  return Promise.reject()
}
