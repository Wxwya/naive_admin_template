import axios, { AxiosResponse} from "axios";
import cache from "./cache";
import { TOKEN_KEY } from "@/enums/cacheEnums";
/**
 * 
 * @param file 文件
 */
type QueryData = {
  onUploadProgress: (progressEvent: ProgressEvent) => number,
  data: any,
  headers:any
}
export const upFile = (url:string,file:File, queryData:QueryData) => { 
  const formData = new FormData();
  if (headers.data) { 
    Object.keys(queryData.data).forEach(key => {
      formData.append(key, queryData.data[key])
    })
  }
  formData.append('file', file);
  axios.post(import.meta.env.VITE_APP_URL + import.meta.env.VITE_APP_PREFIX + url, formData, {
    headers: {
      'Authorization': 'Bearer ' + cache.getLocalStorage(TOKEN_KEY),
      ...queryData.headers,
    }
    onUploadProgress:queryData.onUploadProgress
  }).then((response: AxiosResponse) => { 
    const res = response.data
    handleMsg(res, true)
    return res
  }).catch((error: any) => {
    window.$msg.error(error)
    return Promise.reject(error)
  })
}

export const upManyFile = (url: string, files: File[], queryData: QueryData):Promise<AxiosResponse<any>>=>  {
  const formData = new FormData();
  if (headers.data) {
    Object.keys(queryData.data).forEach(key => {
      formData.append(key, queryData.data[key])
    })
  }
  files.forEach((file) => {
    formData.append('files[]', file)
  })
  axios.post(import.meta.env.VITE_APP_URL + import.meta.env.VITE_APP_PREFIX + url, formData, {
    headers: {
      'Authorization': 'Bearer ' + cache.getLocalStorage(TOKEN_KEY),
      ...queryData.headers,
    }
    onUploadProgress:queryData.onUploadProgress
  }).then((response: AxiosResponse) => { 
    const res = response.data
    handleMsg(res, true)
    return res
  }).catch((error: any) => {
    window.$msg.error(error)
    return Promise.reject(error)
  })
}