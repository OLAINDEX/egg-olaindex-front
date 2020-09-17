import request from '../utils/request'

const fetchItem = (params) => {
  return request.get('/share', params)
}


const share = {
  fetchItem,
}

export default share
