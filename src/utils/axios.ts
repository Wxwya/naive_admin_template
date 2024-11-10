import axios from 'axios'
import handleMsg from "./handleMsg"
const service = axios.create({
  baseURL:import.meta.env.VITE_APP_URL, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// // 请求拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  response => {
    const config = response.config;
    const res = response.data
    handleMsg(res, config.show)
    return res
  },
  error => {
    // message.error(error.ElMessage)
    window.$msg.error(error)
    return Promise.reject(error)
  }
)

export default service