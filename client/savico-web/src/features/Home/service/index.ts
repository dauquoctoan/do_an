import { ApiClient } from "services"


export const getOverview = (payload: any) => {
  return ApiClient.get('/OverView/OverView', payload)
}

