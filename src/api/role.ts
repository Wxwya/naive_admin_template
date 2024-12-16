
import request from "@/utils/request"
export const generateRole = (data: any) => request.post({ url: "/role/generateRole", data })
export const getRoleInfo = (id: any) => request.get({ url: `/role/roleinfo/${id}` })
export const getRoleList = (data: any) => request.post({ url: "/role/rolelist",  data })
export const getRoleOption = () => request.get({ url: "/role/roleOptions" })
export const delRole = (data:any) => request.post({ url:"/role/deleteRole", data })