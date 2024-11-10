import request from "@/utils/fetch"

export const generatePermissions = (data: any) => request({ url: "/permissions/generatePermissions", method: "post", data })
export const getPermissionsInfo = (id: any) => request({ url: `/permissions/permissionsinfo/${id}` })
export const getPermissionsList = (data: any) => request({ url: "/permissions/permissionslist", method: "post", data })
export const getPermissionsOptions = () => request({ url:"/permissions/permissionsOption"})
export const delPermissions = (data: any) => request({ url: "/permissions/deletePermissions", method: "post", data })
