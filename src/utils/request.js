import axios from 'axios'
import {toast} from 'bulma-toast'

const config = {
  baseURL: '/',
  timeout: 5000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    console.log(error)
    // Do something with response error
    toast({
      message: '网络错误,无法请求到数据！',
      type: 'is-danger',
      dismissible: true,
      pauseOnHover: true,
      animate: {in: 'fadeIn', out: 'fadeOut'},
    })
    return Promise.reject(error)
  },
)

export default _axios
