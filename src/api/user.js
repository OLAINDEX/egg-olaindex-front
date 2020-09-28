import request from '../utils/request'

export const login = (params) => {
  return request.post('/user/login', params)
}

export const getInfo = (params) => {
  return request.get('/user/info', params)
}

export const updateInfo = (params) => {
  return request.post('/user/update', params)
}
