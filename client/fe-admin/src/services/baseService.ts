import { create } from 'apisauce'
// import Cookies from 'js-cookie'
import queryString from 'query-string'
// import history from '../utils/history'
// import R from '../utils/R'
// import Configs from '../configs'
// import message from '../commons/message'

const createAPI = () => {
    const APIInstant = create({
        baseURL: process.env.REACT_APP_BASE_URL,
        timeout: 20000,
        headers: { 'Content-Type': 'application/json' },
    })
    // APIInstant.setHeader('Authorization', Cookies.get(configs._sessionId) || '')

    APIInstant.axiosInstance.interceptors.request.use(
        async (config) => {
            // config.headers.Authorization = Cookies.get(Configs._sessionId)
            return config
        },
        (error) => Promise.reject(error)
    )
    APIInstant.axiosInstance.interceptors.response.use((response) => {
        const data = response.data
        if ((data && data.code === 401) || data.code === 402) {
            // Cookies.set(Configs._sessionId, '')
            // localStorage.setItem('token', '')
            // history.push('logout')
            // const store = require('../redux/store').default
            //   store.dispatch({ type: LOGOUT })
            //   NavigationUtil.navigate(SCREEN_ROUTER_APP.HOME)
            //   showMessages(R.strings().notification, R.strings().re_login)
            // }
        } else if (data && data.status !== 1) {
            // Swal.fire({
            //   title: R.strings().fail__api__request,
            //   text: data?.message || R.strings().error__api__network,
            //   icon: 'error',
            // })
            // message({
            //     type: 'error',
            //     content: data?.message || R.strings().api__error_network,
            //     duration: 2,
            // })
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

/* A function that returns a function. */
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
// export default axiosInstance
// const test = 0
export default createAPI
