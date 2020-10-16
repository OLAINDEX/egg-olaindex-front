import request from '../utils/request'

export const fetchBlocks = (params) => {
  return request.get('/blocks', params)
}
