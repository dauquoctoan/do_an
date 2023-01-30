import './App.css'
import CreateGlobalStyle from './global-styled'
import Navigation from './navigation'
import { useSelector } from 'react-redux'
import type { RootState } from './store/store'
import Configs from './configs'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

function App() {
  const data: any = useSelector((store: RootState) => store.authReducer)
  const history = useHistory()
  const location = useLocation()

  React.useLayoutEffect(() => {
    const token = localStorage.getItem(Configs._token)
    if (!token) {
      history.push('/login')
    }
  }, [])

  return (
    <div className="App">
      <Navigation />
      <CreateGlobalStyle />
    </div>
  )
}

export default App
