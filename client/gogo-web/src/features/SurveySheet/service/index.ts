import { apis } from "configs/api"
import { ApiClient } from "services"


export const getListQuestions = (payload: any) => {
  return ApiClient.get(`/Survey/GetListSurveryQuestions`, payload)
}

export const deleteSurveyQuestion = (id: number) => {
  return ApiClient.post(`/Survey/DeleteSurvery/${id}`, {})
}

export const changeSurveyQuestionStatus = (id: number) => {
  return ApiClient.post(`/Survey/ChangeStatus/${id}`, {})
}

export const addSurveyQuestion = (payload: any) => {
  return ApiClient.post(`/Survey/CreateSurvery`, payload)
}

export const updateSurveyQuestion = (payload: any) => {
  return ApiClient.post(`/Survey/UpdateSurvery`, payload)
}

