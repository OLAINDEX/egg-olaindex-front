import request from '../utils/request'

export const init = (params) => {
  return request.post('/account/init', params)
}

export const fetchList = (params) => {
  return request.get('/account/list', params)
}

export const fetchConfig = (params) => {
  return request.get('/account/config', params)
}

export const updateConfig = (params) => {
  return request.post('/account/config', params)
}

export const view = (params) => {
  return request.get('/account/view', params)
}

export const update = (params) => {
  return request.post('/account/update', params)
}

export const remove = (params) => {
  return request.post('/account/delete', params)
}

export const setMain = (params) => {
  return request.post('/account/setMain', params)
}

export const setImageHost = (params) => {
  return request.post('/account/setImageHost', params)
}
