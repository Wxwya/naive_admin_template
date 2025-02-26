 
const handleMsg = (pageData: any, show: boolean,msg:string) => { 
  if (pageData.code === 200) {
    show && window.$msg.success(msg||pageData.msg || 'ok')
  } else if (pageData.code === 1001 || pageData.code === 1002 || pageData.code === 1003 || pageData.code === 1004) {
    window.$msg.error(pageData.msg || '请求错误')
    localStorage.removeItem('token')
    location.reload()
  } else if (pageData.code === 500) {
    window.$msg.error("请稍后重试....")
  } else { 
    window.$msg.error(pageData.msg || '请求错误')
  }
  
}

export default handleMsg