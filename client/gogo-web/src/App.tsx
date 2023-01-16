import './App.css'
import CreateGlobalStyle from './global-styled'
import Navigation from './navigation'
import { useSelector } from 'react-redux'
import type { RootState } from './store/store'
import Cookie from 'js-cookie'
import Configs from './configs'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

function App() {
  const data: any = useSelector((store: RootState) => store.authReducer)
  const history = useHistory()
  const location = useLocation()

  // React.useLayoutEffect(() => {
  //   const cookie = Cookie.get(Configs._sessionId)
  //   if (!cookie) {
  //     if (location.pathname.includes('webview')) return
  //     history.push('/login')
  //   }
  // }, [])

  return (
    <div className="App">
      <Navigation />
      <CreateGlobalStyle />
    </div>
  )
}

export default App
