import axios, { AxiosInstance } from 'axios'
import handleMsg from "./handleMsg"
import { RequestOption } from './request'
import cache from '../cache'
import { TOKEN_KEY } from '@/enums/cacheEnums'


const createAxiosRequest = (option:RequestOption):AxiosInstance => { 
  const service = axios.create(option)
  // ! 请求拦截器
  service.interceptors.request.use(
    config => {
      if (option.withToken) { 
        option.headers[option.headTokenKey]=option.tokenPrefix+cache.getLocalStorage(TOKEN_KEY)
      }
      config.headers = option.headers

      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
  // ! 响应拦截器
  service.interceptors.response.use(
    response => {
      const config = response.config;
      const res = response.data
      handleMsg(res, config)
      return res
    },
    error => {
      window.$msg.error(error.message)
      error.config.retryCount--;
      if (error.config.retry && error.config.retryCount < 0 || !error.config.retry) { 
        return new Error(error) 
      }
      return  new Promise((resolve) => {
        setTimeout(() => {
          resolve(service(error.config));
        }, error.config.retryTimeout);
      })
    }
  )
  return service
}

export default createAxiosRequest