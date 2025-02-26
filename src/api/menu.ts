
import request from "@/utils/request"
export const generateMenu = (data: any) => request.post({ url: "/menu/generateMenu", data })
export const getMenuList = (data: any) => request.post({ url: "/menu/menulist", data })
export const getMenuInfo = (id: any) => request.get({ url: `/menu/menuinfo/${id}` })
export const delMenu = (data: any) => request.post({ url: `/menu/deleteMenu`, data })
export const getMenuOption = () => request.get({ url: "/menu/menuOptions" })
export const changeMenuStatus = (data: any) => request.post({ url: "/menu/changeStatus", data })
export const getSubMenuList = (data:any) => request.post({url:"/menu/subMenuList",data})