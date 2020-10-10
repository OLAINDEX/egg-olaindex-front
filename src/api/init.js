import request from '../utils/request'

export const init = (params) => {
  return request.post('/init', params)
}
