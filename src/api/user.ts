import request from "@/utils/request"

export const generateUser = (data: any) => request.post({ url: "/businessUser/generateUser", method: "post", data })
export const getUserInfo = () => request.get({ url: "/businessUser/userinfo" })
export const delUser = (data: any) => request.post({ url: "/businessUser/deleteUser", method: "post", data }, {show:true})
export const getUserList = (data: any) => request.post({ url: "/businessUser/userlist", method: "post", data })
export const changeUserStatus = (data: any) => request.post({url:"/businessUser/changeStatus",method:"post",data})
