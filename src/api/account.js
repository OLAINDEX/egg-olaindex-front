import request from '../utils/request'

export const create = (params) => {
  return request.post('/account/create', params)
}
