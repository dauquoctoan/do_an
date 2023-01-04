import { create } from "apisauce";
//import Cookies from "js-cookie";
import queryString from "query-string";
// import history from "../utils/history";
// import R from '../utils/R'
// import Configs from "../configs";
// import message from "../commons/message";

const Configs = {
  _baseUrl: process.env.REACT_APP_BASE_URL,
  _sessionId: "session",
  _api_status: {
    RE_LOGIN: "400",
    NOT_FOUND: "404",
  },
};

const createAPI = () => {
  const APIInstant = create({
    baseURL: Configs._baseUrl,
    timeout: 20000,
    headers: { "Content-Type": "application/json" },
  });
  // APIInstant.setHeader('Authorization', Cookies.get(configs._sessionId) || '')

  APIInstant.axiosInstance.interceptors.request.use(
    async (config: any) => {
      //config.headers.Authorization = Cookies.get(Configs._sessionId);
      return config;
    },
    (error: any) => Promise.reject(error)
  );
  APIInstant.axiosInstance.interceptors.response.use((response: any) => {
    const data = response.data;
    if (
      (data && data.code === Configs._api_status.RE_LOGIN) ||
      data.code === Configs._api_status.NOT_FOUND
    ) {
      //Cookies.set(Configs._sessionId, "");
      localStorage.setItem("token", "");
      // history.push("logout");
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
    }
    // showMessages(R.strings().notification, data.msg)
    return response;
  });
  return APIInstant;
};
const axiosInstance = createAPI();

/* Support function */
function handleResult(api: any) {
  return api.then((res: { data: { status: number; code: number } }) => {
    if (res?.data?.status !== 1) {
      // message.error(`Đã có lỗi xảy ra, vui lòng thử lại`)
      return Promise.reject(res?.data);
    }
    return Promise.resolve(res?.data);
  });
}

function parseUrl(url: string, query: any) {
  return queryString.stringifyUrl({ url: url, query });
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
  uploadFile: async (url: string, payload: any, config: any) => {
    const res = await axiosInstance.post(url, payload, config);
    return res.data;
  },
};

export default axiosInstance;
