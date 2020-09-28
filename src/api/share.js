import request from '../utils/request'

const fetchItem = (params) => {
  return request.post('/share', params)
}

export default {
  fetchItem,
}
