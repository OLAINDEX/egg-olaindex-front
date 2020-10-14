import request from '../utils/request'

export const init = (params) => {
  return request.post('/account/init', params)
}
export const fetchList = (params) => {
  return request.get('/account/list', params)
}

export const remove = (params) => {
  return request.post('/account/delete', params)
}
