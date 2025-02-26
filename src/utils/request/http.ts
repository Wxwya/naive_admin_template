import axios, { AxiosInstance } from "axios";
import { RequestConfig, RequestOption } from './request';
import createAxiosRequest from './axios';
import fetchRequest from "./fetch";
import { RequestMethodsEnum,ContentTypeEnum} from "@/enums/requestEnums"
let  axiosReuqest 
export default class HttpRequest { 
  private readonly option: RequestOption;
  constructor(option: RequestOption) {
    if (typeof option.requestHooks.beforeRequest=== 'function') {
      this.option =option.requestHooks.beforeRequest(option)
    } else { 
      throw new Error('requestHooks afterRequest is not a function')
    }
    if (this.option.requestType === 'axios') { 
      axiosReuqest = createAxiosRequest(this.option)
    }
  }
  get(option: RequestOption, config: RequestConfig):Promise<any>  { 
    return this.request({...option,method:RequestMethodsEnum.GET}, config)
  }
  post(option: RequestOption, config: RequestConfig): Promise<any> { 
    return this.request({...option,method:RequestMethodsEnum.POST}, config)
  }
  put(option: RequestOption, config: RequestConfig): Promise<any> {
    return this.request({...option,method:RequestMethodsEnum.PUT}, config)
  }
  delete(option: RequestOption, config: RequestConfig): Promise<any> {
    return this.request({...option,method:RequestMethodsEnum.DELETE}, config)
  }
  uploadFile(option: RequestOption, config: RequestConfig) { 
    option.headers['Content-Type'] = ContentTypeEnum.FORM_DATA
    const  method = RequestMethodsEnum.POST
    if (this.option.requestType === "axios") {
      option.data=option.file
      return axiosReuqest({
        ...option,
        ...config,
        method
      })
    } else { 
      option.baseURL=this.option.baseURL+option.url
     return fetchRequest({
        ...this.option,
        ...option,
        method
      }, config)
    }
  }

  private readonly request(option: RequestOption, config: RequestConfig): Promise<any> {
    
    if (this.option.requestType === 'axios') {
      return axiosReuqest({ ...option, ...config })
    } else { 
      option.baseURL = this.option.baseURL + option.url
      return fetchRequest({...this.option,...option}, config)
    }
  }
}
