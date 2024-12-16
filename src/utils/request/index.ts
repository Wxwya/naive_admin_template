import { RequestHooks, RequestOption } from "./request";
import cache from "@/utils/cache";
import { TOKEN_KEY } from "@/enums/cacheEnums"
import { ContentTypeEnum } from "@/enums/requestEnums"
import HttpRequest from "./http";
const requestHooks: RequestHooks = {
  beforeRequest: (option, config) => {
    let { withToken, headers, prefix, baseURL,tokenPrefix,headTokenKey,credentials,requestType,withCredentials } = option
    option.headers = headers ?? {}
    if (prefix) { 
      option.baseURL = baseURL + prefix
    }
    if (withCredentials && requestType === "fetch") { 
      option.credentials = "include"
    }
    if (withToken) {
      option.headers[headTokenKey] = tokenPrefix + cache.getLocalStorage(TOKEN_KEY)
    }
    return option
  },
  
}
const defaultOptions:RequestOption = {
  baseURL:import.meta.env.VITE_APP_URL,
  prefix: import.meta.env.VITE_APP_PREFIX,
  headers: {
    'Content-Type':ContentTypeEnum.JSON,
  },
  withCredentials :true, // 是否开启cookie
  withToken: false, // 是否携带token
  requestHooks:requestHooks,
  requestType: "fetch",
  retryCount: 2,
  retryTimeout: 5000,
  tokenPrefix: "Bearer ",
  headTokenKey: "Authorization",
  timeout: 5000,
  retry: false,
};

export const createRequest = (options: RequestOption) => { 
  return new HttpRequest({
    ...defaultOptions,
    ...options
  })
}
const request = createRequest()

export default request

