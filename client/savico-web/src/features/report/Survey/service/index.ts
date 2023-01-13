import { ApiClient } from "services"


export const getChartData = (id?: number) => {
  return ApiClient.get(`/Survey/GetSurveyAnswerStatistic?ID=${id}`, {})
}

export const getOtherOpinions = (payload: any) => {
  return ApiClient.get(`/Survey/GetSurveyContentStatistic`, payload)
}

