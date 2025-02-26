import cache from '../cache'
import handleMsg from './handleMsg'
import { RequestConfig, RequestOption } from './request'
import { RequestMethodsEnum } from '@/enums/requestEnums'
import { TOKEN_KEY } from '@/enums/cacheEnums'
const queryString = (params: Record<string, any>): string => {
  
  return Object.keys(params).length > 0
    ? '?' +
        Object.keys(params)
          .map((key) => `${key}=${encodeURIComponent(params[key])}`)
          .join('&')
    : ''
}
const handleResponse = async (response: Response, config: RequestConfig): Promise<any> => {
  const pageData = await response.json()
  if (response.ok) {
    handleMsg(pageData, config)
    return pageData
  } else {
    window.$msg.error(pageData.code + ':' + pageData.msg || pageData.code + ':' + '请求错误')
    throw new Error(pageData.code + ':' + (pageData.msg || '请求错误'))
  }
}
const fetchRequest = async (options: RequestOption, config: RequestConfig): Promise<any> => {
  options.data = options.data || {}
  if (options.withToken) { 
    options.headers[options.headTokenKey]=options.tokenPrefix+cache.getLocalStorage(TOKEN_KEY)
   }
  try {
    if (options.method === RequestMethodsEnum.GET) {
      options.baseURL = options.baseURL + queryString(options.data)
    } else {
      options.body = options.file? options.file: options.data&&JSON.stringify(options.data)
    }
    const controller = new AbortController()
    options.signal = controller.signal

    const timer = setTimeout(() => {
      controller.abort()
    }, options.timeout)
    /*
    可以做一些请求前的操作
    */
    
    const response = await fetch(options.baseURL, options)
    clearTimeout(timer)
    return await handleResponse(response, config)
  } catch (err: any) {
    /*
    统一捕获一些错误的处理
    */
    window.$msg.error(err.message || '发送请求错误')
    if (options.retry && options.retryCount < 0 || !options.retry) {
      return new Error(err.message || '发送请求错误')
     }
  }
  if (options.retry && options.retryCount > 0) {
    await new Promise(resolve => setTimeout(resolve, options.retryTimeout));
    options.retryCount--
    return fetchRequest(options, config)
  }
}


export default fetchRequest
