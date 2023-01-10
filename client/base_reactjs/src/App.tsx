import './App.css'
import CreateGlobalStyle from './global-styled'
import Navigation from './navigation'
import { useDispatch, useSelector } from 'react-redux'
import store, { useAppDispatch } from './store/store'
import type { RootState } from './store/store'
import {
  increment,
  decrement,
  incrementByAmount,
} from './store/count/countSlice'
import { getUserInfoAction } from './store/auth/AuthenSlice'
import React from 'react'
import { COLOR } from './configs/theme'

function App() {
  const data: any = useSelector((store: RootState) => store.authReducer)
  console.log('data', data)
  return (
    <div className="App">
      <Navigation />
      <CreateGlobalStyle color={COLOR} />
    </div>
  )
}

export default App

// const lngs: any = {
//   en: { nativeName: 'English' },
//   vi: { nativeName: 'Vietnam' },
// }

{
  /* {lang(t).system_add} */
}

// const { t } = useTranslation()
{
  /* <div>
        {Object.keys(lngs).map((lng) => (
          <button
            key={lng}
            style={{
              fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal',
            }}
            type="submit"
            onClick={() => i18n.changeLanguage(lng)}
          >
            {lngs[lng].nativeName}
          </button>
        ))}
      </div> */
}
