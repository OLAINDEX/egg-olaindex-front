import request from '../utils/request'

export const login = (params) => {
  return request.post('/user/login', params)
}

export const getInfo = (params) => {
  return request.get('/user', params)
}

export const updateInfo = (params) => {
  return request.post('/user', params)
}
