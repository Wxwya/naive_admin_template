import handleMsg from "./handleMsg"
const baseUrl = import.meta.env.VITE_APP_URL // 提供一个默认的baseUrl

interface FetchOptions {
  url: string
  method?: string
  data?: Record<string, any>
  headers?: Record<string, string>
  show: boolean
}

const queryString = (params: Record<string, any>): string => {
  return Object.keys(params).length > 0
    ? '?' +
        Object.keys(params)
          .map((key) => `${key}=${encodeURIComponent(params[key])}`)
          .join('&')
    : ''
}

const handleResponse = async (response: Response, show: boolean): Promise<any> => {
  const pageData = await response.json()
  if (response.ok) {
    handleMsg(pageData,show)
    return pageData
  } else {
    window.$msg.error(pageData.code + ':'+ pageData.msg || pageData.code + ':'+ '请求错误')
    throw new Error(pageData.code + ':' + (pageData.msg || '请求错误'))
  }
}


const fetchData = async ({ url, method = 'GET', data = {}, headers = {}, show = false }: FetchOptions): Promise<any> => {
  try {
    const options: RequestInit = {
      method: method.toUpperCase(),
      credentials: 'include', // 如果需要携带cookie，可以设置这个选项
      headers: {
        ...headers,
      },
    }

    if (options.method === 'GET') {
      url = baseUrl + url + queryString(data)
    } else {
      options.body = JSON.stringify(data)
    }

    /*
    可以做一些请求前的操作
    */
    const response = await fetch(baseUrl + url, options)
    return await handleResponse(response, show)
  } catch (err: any) {
    /*
    统一捕获一些错误的处理
    */
    window.$msg.error(err.message || '发送请求错误')
    return new Error(err.message || '发送请求错误')
  }
}

export default fetchData
