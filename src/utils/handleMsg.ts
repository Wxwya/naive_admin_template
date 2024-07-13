 
const handleMsg = (pageData: any, show: boolean) => { 
  if (pageData.code === 200) {
    show && window.$msg.success(pageData.msg || 'ok')
  } else if (pageData.code === 1001 || pageData.code === 1002 || pageData.code === 1003 || pageData.code === 1004) {
    window.$msg.error(pageData.msg || '请求错误')
    // 退到登录页面
  } else if pageData.code === 500 {
    window.$msg.error("请稍后重试....")
  } else { 
    window.$msg.error(pageData.msg || '请求错误')
  }
  
}

export default handleMsg