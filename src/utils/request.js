import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import qs from 'qs'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  config.transformRequest = [function(data) {
    return qs.stringify(data)
  }]
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * status为非200是抛错 可结合自己业务进行修改
  */
    const status = response.status
    if (status !== 200) {
      Message({
        message: '服务连接异常，请稍后重试或联系管理员',
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
  }
)

const HttpService = {
  post: function(url, params) {
    return service({
      url: url,
      method: 'post',
      data: params
    })
  },
  get: function(url, params) {
    return service({
      url: url,
      method: 'get',
      params: params
    })
  }
}
export default HttpService
