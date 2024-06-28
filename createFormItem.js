import {reactive,isReactive } from 'vue'
/***
 *  @param {string} type - 类型
 *  @param {Object} payload - 组件使用到的参数
 *  @param {Function} next - 获取下一项
 *  @param {Object} parent - 上一项
 *  @returns {Object} 返回formitem
 *  
 */
export const createFormItem = (type, payload, next, parent) => {
  if (!next) {
    next = () => null
  }
  if (!parent) {
    parent = null
  }
  const nextFunc = (current, acients) => {
    let nextItem = next(current, acients)
    if (!nextItem) {
      return null
    }
    nextItem.parent = current
    if (!isReactive(nextItem)) { 
      nextItem = reactive(nextItem)
    }
    return nextItem
  }
  const formItem = reactive({
    type,
    payload,
    next: nextFunc,
    parent,
    watch
  })
  return formItem
}

