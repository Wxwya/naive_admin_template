import request from "@/utils/fetch"

export const generateUser = (data: any) => request({ url: "/businessUser/generateUser", method: "post", data })
export const getUserInfo = () => request({ url: "/businessUser/userinfo" })
export const delUser = (data: any) => request({ url: "/businessUser/deleteUser", method: "post", data },true)
export const getUserList = (data: any) => request({ url: "/businessUser/userlist", method: "post", data })
export const changeUserStatus = (data: any) => request({url:"/businessUser/changeStatus",method:"post",data})
