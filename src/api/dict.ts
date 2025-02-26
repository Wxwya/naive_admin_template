import request from "@/utils/request"

export const getDictList = (data: any) => request.post({ url: "/dict/dictlist", data })
export const generateDict = (data: any) => request.post({ url: "/dict/generateDict", data }, {show:true})
export const getDictType = (type: string) => request.get({ url: `/dict/${type}` })
export const delDict = (data: any) => request.post({ url: "/dict/deleteDict",  data })
export const getDictInfo = (id:any) => request.get({ url: `/dict/dictinfo/${id}` })
export const getDictTypeList = (data: any) => request.post({ url: "/dict/dictTypeList",  data })
export const delDictType = (data: any) => request.post({ url: "/dict/deleteDictType",  data },{show:true})
export const generateDictType = (data: any) => request.post({ url: "/dict/generateDictType", data }, {show:true})
export const changeDictStatus = (data: any) => request.post({ url: "/dict/changeStatus", data }, {show:true})