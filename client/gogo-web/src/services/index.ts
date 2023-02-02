import { create } from 'apisauce'
import message from 'commons/message'
import queryString from 'query-string'

const Configs = {
  _baseUrl: process.env.REACT_APP_BASE_URL + '/admin',
  _sessionId: 'session',
  _api_status: {
    RE_LOGIN: 400,
    NOT_FOUND: 404,
  },
}

const createAPI = () => {
  const APIInstant = create({
    baseURL: Configs._baseUrl,
    timeout: 20000,
    headers: { 'Content-Type': 'application/json' },
  })

  APIInstant.setHeader('Authorization', localStorage.getItem('token') || '')
  APIInstant.axiosInstance.interceptors.request.use(
    async (config: any) => {
      config.headers.Authorization = localStorage.getItem('token') || ''
      return config
    },
    (error: any) => Promise.reject(error)
  )

  APIInstant.axiosInstance.interceptors.response.use((response: any) => {
    console.log('response', response)
    if (
      (response && response.status === Configs._api_status.RE_LOGIN) ||
      response.status === Configs._api_status.NOT_FOUND
    ) {
      localStorage.setItem('token', '')
      message.error('Bạn đã hết quyền đăng nhập vui lòng đăng nhập lại!')
    }
    return response
  })
  return APIInstant
}

const axiosInstance = createAPI()

/* Support function */
function handleResult(api: any) {
  return api.then(
    (res: {
      status: number
      data: { status: number; code: number; message: string }
    }) => {
      if (res.status === Configs._api_status.RE_LOGIN) {
        localStorage.setItem('token', '')
        localStorage.setItem('user_info', '')
      }
      if (res?.data?.code !== 1) {
        message.error(res?.data?.message || 'Có lỗi xảy ra vui lòng thử lại')
        return Promise.reject(res?.data)
      }
      return Promise.resolve(res?.data)
    }
  )
}

function parseUrl(url: string, query: any) {
  return queryString.stringifyUrl({ url: url, query })
}

/* A function that returns a function. */
export const ApiClient = {
  get: (url: string, payload?: any) =>
    handleResult(axiosInstance.get(parseUrl(url, payload))),
  post: (url: string, payload: any) =>
    handleResult(axiosInstance.post(url, payload)),
  put: (url: string, payload?: any) =>
    handleResult(axiosInstance.put(url, payload)),
  patch: (url: string, payload: any) =>
    handleResult(axiosInstance.patch(url, payload)),
  delete: (url: string, payload: any) =>
    handleResult(axiosInstance.delete(url, {}, { data: payload })),
  uploadFile: async (url: string, payload: any, config: any) => {
    const res = await axiosInstance.post(url, payload, config)
    return res.data
  },
}

export default ApiClient
