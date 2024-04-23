import { toast } from './extendApi'
import {
  MethodConstant,
  MessageConstant
} from '../constant/index'

class WxRequest {
  defaultConfig = {
    baseURL: 'https://gmall-prod.atguigu.cn/mall-api',
    url: '',
    data: null,
    method: MethodConstant.GET,
    header: {
      'Content-type': 'application/json'
    },
    timeout: 60000
  }

  interceptors = {
    request: config => config,
    response: res => res
  }

  constructor(params = {}) {
    this.defaultConfig = Object.assign({}, this.defaultConfig, params)
  }

  request(config) {
    config.url = this.defaultConfig.baseURL + config.url
    config = this.interceptors.request({...this.defaultConfig, ...config})
    return new Promise((resolve, reject) => {
      wx.request({
        ...config,
        success: (res) => {
          res = this.interceptors.response(res)
          resolve(res)
        },
        fail: (err) => {
          err = this.interceptors.response(err)
          reject(err)
        }
      })
    })
  }

  get = (url, data = {}, config) => {
    config = { url, data, ...config, method: MethodConstant.GET }
    return this.request(config)
  }

  del = (url, data = {}, config) => {
    config = { url, data, ...config, method: MethodConstant.DELETE }
    return this.request(config)
  }

  post = (url, data = {}, config) => {
    config = { url, data, ...config, method: MethodConstant.POST }
    return this.request(config)
  }

  put = (url, data = {}, config) => {
    config = { url, data, ...config, method: MethodConstant.PUT }
    return this.request(config)
  }
}

const ajax = new WxRequest()

ajax.interceptors.request = (config) => {
  return config
}
ajax.interceptors.response = (res) => {
  if (res.errMsg && res.errMsg !== 'request:ok') {
    toast({
      title: res.errMsg || MessageConstant.COMMON
    })
  } else if (res.data.error) {
    toast({
      title: res.message || MessageConstant[res.data.status] || MessageConstant.COMMON
    })
  }
  return res.data
}

export default ajax
export const {
  request,
  get,
  post,
  put,
  del
} = ajax
