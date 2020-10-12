import request from '../utils/request'

export const init = (params) => {
  return request.post('/init', params)
}

export const check = (params) => {
  return request.get('/init/check', params)
}

export const load = (params) => {
  return request.get('/init/load', params)
}
