 
import cache from "@/utils/cache"
import { RequestCodeEnum} from "@/enums/requestEnums"
import { RequestConfig } from "./request"
import { TOKEN_KEY } from "@/enums/cacheEnums"
const handleMsg = (pageData: any, config: RequestConfig) => { 
  if (pageData.code === RequestCodeEnum.SUCCESS) {
    config?.show && window.$msg.success(config.message||pageData.msg || 'ok')
  } else if (RequestCodeEnum.TOKEN_INVALID.includes(pageData.code)) {
    window.$msg.error(pageData.msg || '请求错误')
    // cache.remove(TOKEN_KEY)
    // location.reload()
  } else if (pageData.code === RequestCodeEnum.ServerError) {
    window.$msg.error("请稍后重试....")
  } else { 
    window.$msg.error(pageData.msg || '请求错误')
  }
  
}

export default handleMsg