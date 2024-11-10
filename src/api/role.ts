
import request from "@/utils/fetch"

export const generateRole = (data: any) => request({ url: "/role/generateRole", data, method: 'post' })
export const getRoleInfo = (id: any) => request({ url: `/role/roleinfo/${id}` })
export const getRoleList = (data: any) => request({ url: "/role/rolelist", method: "post", data })
export const getRoleOption = () => request({ url: "/role/roleOptions" })
export const delRole = (data:any) => request({ url:"/role/deleteRole", method: "post", data })