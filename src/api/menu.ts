
import request from "@/utils/fetch"

export const generateMenu = (data: any) => request({ url: "/menu/generateMenu", method: "post", data })
export const getMenuList = (data: any) => request({ url: "/menu/menulist", method: "post", data })
export const getMenuInfo = (id: any) => request({ url: `/menu/menuinfo/${id}` })
export const delMenu = (data: any) => request({ url: `/menu/deleteMenu`, method: "post", data })
export const getMenuOption = () => request({ url: "/menu/menuOptions" })
export const changeMenuStatus = (data: any) => request({ url: "/menu/changeStatus", method: "post", data })
export const getSubMenuList = (data:any) => request({url:"/menu/subMenuList",method:"post",data})