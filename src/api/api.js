import request from '../utils/request'

export const fetchList = (params) => {
  return request.get('/api/list', params)
}
