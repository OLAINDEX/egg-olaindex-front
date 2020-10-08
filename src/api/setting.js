import request from '../utils/request'

export const fetchSetting = (params) => {
  return request.get('/setting', params)
}

export const updateSetting = (params) => {
  return request.post('/setting', params)
}
