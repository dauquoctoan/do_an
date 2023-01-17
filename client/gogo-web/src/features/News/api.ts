import { apis } from '../../configs/api'
import { ApiClient } from '../../services'

export const createLesson = (payload: any) => {
  return ApiClient.post('/lesson', payload)
}
////old

const path = apis.news

export const getNews = (payload: any) => {
  return ApiClient.get(path.GET_NEWS, payload)
}

export const createNews = (payload: any) => {
  return ApiClient.post(path.CREATE_NEWS, payload)
}

export const getNewsDetail = (payload: any) => {
  return ApiClient.get(path.NEWS_DETAIL.concat(`/${payload.ID}`), {})
}

export const deleteNews = (payload: any) => {
  const Path = path.DELETE_NEWS.concat(`/${payload.ID}`)
  return ApiClient.post(Path, {})
}

export const updateNews = (payload: any) => {
  return ApiClient.post(path.UPDATE_NEWS, payload)
}

export const getStalls = (payload: any) => {
  return ApiClient.get(apis.stall.GET_STALLS, payload)
}

export const changeStatusNews = (payload: any) => {
  return ApiClient.post(
    apis.news.CHANGE_STATUS_NEWS.concat(`/${payload.ID}`),
    {}
  )
}
