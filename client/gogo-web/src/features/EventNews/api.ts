import { apis } from '../../configs/api'
import { ApiClient } from '../../services'

export const getTopics = (payload: any) => {
  return ApiClient.get('/topics', payload)
}
export const createPart = (payload: any) => {
  return ApiClient.post('/part', payload)
}
export const getParts = (payload: any) => {
  return ApiClient.get('/parts', payload)
}

export const updateParts = (payload: any) => {
  return ApiClient.put('/part', payload)
}

export const deletePart = (payload: any) => {
  return ApiClient.delete('/part', payload)
}

export const createEventNews = (payload: any) => {
  return ApiClient.post('/event-news', payload)
}
export const getEventNews = (payload: any) => {
  return ApiClient.get('/event-news', payload)
}

export const updateEventNews = (payload: any) => {
  return ApiClient.put('/event-news', payload)
}

export const deleteEventNews = (payload: any) => {
  return ApiClient.delete('/event-news', payload)
}


