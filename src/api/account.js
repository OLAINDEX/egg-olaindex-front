import request from '../utils/request'

export const init = (params) => {
  return request.post('/account/init', params)
}

export const fetchList = (params) => {
  return request.get('/account/list', params)
}

export const update = (params) => {
  return request.post('/account/update', params)
}

export const remove = (params) => {
  return request.post('/account/delete', params)
}

export const mark = (params) => {
  return request.post('/account/mark', params)
}
