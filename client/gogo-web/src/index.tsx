import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import store from './store/store'

import { Router } from 'react-router-dom'
import history from 'utils/history'
import vi_VN from 'antd/es/locale/vi_VN'

import 'moment/locale/vi'
import 'antd/dist/antd.variable.min.css'
import './index.css'
import './locales/index'
import './configs/theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ConfigProvider locale={vi_VN}>
      <Router history={history}>
        <App />
      </Router>
    </ConfigProvider>
  </Provider>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
