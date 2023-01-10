import { create } from 'apisauce'
import configs from '../configs'
import Cookie from 'js-cookie'
import queryString from 'query-string'

import Swal from 'sweetalert2'
import history from '../utils/history'
import { API_STATUS } from '../utils/constants'
import R from '../utils/R'
import Configs from '../configs'

const createAPI = () => {
  const APIInstant = create({
    baseURL: Configs._baseUrl,
    timeout: 20000,
    headers: { 'Content-Type': 'application/json' },
  })
  APIInstant.setHeader('token', Cookie.get(configs._sessionId) || '')

  APIInstant.axiosInstance.interceptors.request.use(
    async (config) => {
      config.headers.token = Cookie.get(configs._sessionId)
      return config
    },
    (error) => Promise.reject(error)
  )
  APIInstant.axiosInstance.interceptors.response.use((response) => {
    const data = response.data
    if (
      (data && data.code === API_STATUS.RE_LOGIN) ||
      data.code === API_STATUS.NOT_FOUND
    ) {
      Cookie.set(configs._sessionId, '')
      localStorage.setItem('token', '')
      history.push('logout')
      // const store = require('../redux/store').default
      //   store.dispatch({ type: LOGOUT })
      //   NavigationUtil.navigate(SCREEN_ROUTER_APP.HOME)
      //   showMessages(R.strings().notification, R.strings().re_login)
      // }
    } else if (data && data.status !== 1) {
      Swal.fire({
        title: R.strings().fail_api_request,
        text: data?.message || R.strings().error_api_network,
        icon: 'error',
      })
    }
    // showMessages(R.strings().notification, data.msg)
    return response
  })
  return APIInstant
}
const axiosInstance = createAPI()

/* Support function */
function handleResult(api: any) {
  return api.then((res: { data: { status: number; code: number } }) => {
    if (res?.data?.status !== 1) {
      // message.error(`Đã có lỗi xảy ra, vui lòng thử lại`)
      return Promise.reject(res?.data)
    }
    return Promise.resolve(res?.data)
  })
}

function parseUrl(url: string, query: any) {
  return queryString.stringifyUrl({ url: url, query })
}

export const ApiClient = {
  get: (url: string, payload?: any) =>
    handleResult(axiosInstance.get(parseUrl(url, payload))),
  post: (url: string, payload: any) =>
    handleResult(axiosInstance.post(url, payload)),
  put: (url: string, payload?: any) =>
    handleResult(axiosInstance.put(url, payload)),
  path: (url: string, payload: any) =>
    handleResult(axiosInstance.patch(url, payload)),
  delete: (url: string, payload: any) =>
    handleResult(axiosInstance.delete(url, {}, { data: payload })),
}
// const axiosInstance = ''
export default axiosInstance
