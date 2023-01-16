import { ApiClient } from 'services'

export const getSurveyLink = () => {
  return ApiClient.get('/Config/GetSurvery')
}

export const updateSurveyLink = (payload: any) => {
  return ApiClient.post(
    `/Config/UpdateLinkSurvery?linkSurvery=${payload.linkSurvery}`,
    {}
  )
}

export const getContact = () => {
  return ApiClient.get('/Config/GetContact')
}

export const updateContact = (payload: any) => {
  return ApiClient.post(
    `/Config/UpdateContact?linkHotLine=${payload.linkHotLine}&linkWebsite=${payload.linkWebsite}&linkFacebook=${payload.linkFacebook}`,
    {}
  )
}

export const getEvent = () => {
  return ApiClient.get('/Config/GetEventInfo')
}

export const updateEvent = (payload: any) => {
  return ApiClient.post(`/Config/UpdateEventInfo?pointAdd=${payload.pointAdd}&orderValue=${payload.orderValue}`, {})
}
