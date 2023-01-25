import { apis } from '../../configs/api'
import { ApiClient } from '../../services'

export const getTopics = (payload: any) => {
  return ApiClient.get('/topics', payload)
}

export const getCategories = (payload: any) => {
  return ApiClient.get(apis.category.GET_CATEGORIES, payload)
}

export const createCategory = (payload: any) => {
  return ApiClient.post(apis.category.CREATE_CATEGORY, payload)
}

export const updateCategory = (payload: any) => {
  return ApiClient.post(apis.category.UPDATE_CATEGORY, payload)
}
export const deleteCategory = (payload: any) => {
  return ApiClient.post(
    apis.category.DELETE_CATEGORY.concat(`/${payload.ID}`),
    {}
  )
}
