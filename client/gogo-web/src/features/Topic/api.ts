import { apis } from '../../configs/api'
import { ApiClient } from '../../services'

export const createTopic = (payload: any) => {
  return ApiClient.post('/topic', payload)
}

export const updateTopic = (payload: any) => {
  return ApiClient.put('/topic', payload)
}

export const getTopics = (payload: any) => {
  return ApiClient.get('/topics', payload)
}

export const deleteTopic = (payload: any) => {
  return ApiClient.delete('/topic', payload)
}

//old
export const getAccounts = (payload: any) => {
  return ApiClient.get(apis.account.GET_ACCOUNTS, payload)
}

export const deleteAccount = (payload: any) => {
  const path = apis.account.DELETE_ACCOUNT.concat(`/${payload.ID}`)
  return ApiClient.post(path, {})
}

export const createAccount = (payload: any) => {
  return ApiClient.post(apis.account.CREATE_ACCOUNT, payload)
}

export const updateAccount = (payload: any) => {
  return ApiClient.post(apis.account.UPDATE_ACCOUNT, payload)
}

export const detailAccount = (payload: any) => {
  return ApiClient.get(apis.account.ACCOUNT_DETAIL, payload)
}

export const ChangeStatusAccount = (payload: any) => {
  return ApiClient.post(
    apis.account.CHANGE_STATUS_ACCOUNT.concat(`/${payload.ID}`),
    {}
  )
}
