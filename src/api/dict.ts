import request from "@/utils/fetch"

export const getDictList = (data: any) => request({ url: "/dict/dictlist", method: "post", data })
export const generateDict = (data: any) => request({ url: "/dict/generateDict", method: 'post', data }, true)
export const getDictType = (type: string) => request({ url: `/dict/${type}` })
export const delDict = (data: any) => request({ url: "/dict/deleteDict", method: "post", data })
export const getDictInfo = (id:any) => request({ url: `/dict/dictinfo/${id}` })
export const getDictTypeList = (data: any) => request({ url: "/dict/dictTypeList", method: "post", data })
export const delDictType = (data: any) => request({ url: "/dict/deleteDictType", method: "post", data },true)
export const generateDictType = (data: any) => request({ url: "/dict/generateDictType", method: 'post', data }, true)
export const changeDictStatus = (data: any) => request({ url: "/dict/changeStatus", method: "post", data},true)