import request from '../utils/request'

const list = (params) => {
  return request.get('/share', params)
}

const share = {
  list,
}

export default share
