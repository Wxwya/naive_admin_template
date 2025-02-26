import request from "@/utils/request"
export const generatePermissions = (data: any) => request.post({ url: "/permissions/generatePermissions",  data })
export const getPermissionsInfo = (id: any) => request.get({ url: `/permissions/permissionsinfo/${id}` })
export const getPermissionsList = (data: any) => request.post({ url: "/permissions/permissionslist",  data })
export const getPermissionsOptions = () => request.get({ url:"/permissions/permissionsOption"})
export const delPermissions = (data: any) => request.post({ url: "/permissions/deletePermissions",  data })
