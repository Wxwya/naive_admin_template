export enum ContentTypeEnum {
  // json
  JSON = "application/json;charset=UTF-8",
  // form-data   上传资源（图片，视频）
  FORM_DATA = "multipart/form-data;charset=UTF-8",
}

export enum RequestMethodsEnum {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum RequestCodeEnum {
  SUCCESS = 200,
  FAILED = 400, 
  TOKEN_INVALID = [1001, 1002, 1003,1004,401],
  ServerError = 500, 
}

export enum RequestErrMsgEnum {
  ABORT = "request:fail abort",
  TIMEOUT = "request:fail timeout",
}