import request from '../utils/request'

export const fetchItem = (params) => {
  return request.post('/share', params)
}
