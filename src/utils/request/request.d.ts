import { AxiosRequestConfig, AxiosResponse } from "axios";
import { FetcherFormProps } from "react-router-dom";
import { FetchModuleOptions } from "vite";
export interface RequestConfig { 
  show: boolean;
  loading?: boolean;
  loadingText?: string;
  message?: string;
}

export interface RequestOption extends RequestInit, AxiosRequestConfig { 
  requestType:"axios" | "fetch"
  withToken?: boolean;
  prefix?: string;
  retryCount?: number;
  retryTimeout?: number;
  requestHooks?: RequestHooks;
  tokenPrefix?: string;
  headTokenKey?: string;
  data?: any;
  url?: string;
  retry?: boolean;
  retryRequest?: (options: RequestOption, error: any) => any
  file:FormData
}

export interface RequestHooks {
  afterRequest?: (response:any,config:RequestConfig) => any;
  beforeRequest?: (option:RequestOption,config:RequestConfig) => RequestOption;
}
