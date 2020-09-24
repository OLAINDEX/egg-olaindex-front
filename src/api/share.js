import request from '../utils/request'

const fetchItem = (params) => {
  return request.post('/share', params)
}


const share = {
  fetchItem,
}

export default share
