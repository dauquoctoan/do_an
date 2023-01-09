import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en_US from './en_US.json'

import vi_VN from './vi_VN.json'

const resources = {
  vi: {
    translation: vi_VN,
  },
  en: {
    translation: en_US,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',

  interpolation: {
    escapeValue: false,
  },
})

export default i18n
