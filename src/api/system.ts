import request from "@/utils/request"
import { allMsgs } from "@/config/message"

export const login = (data: any) => request.post({ url: "/system/login", method: 'post', data }, {show:true})
export const logout = () => request.post({ url: "/system/logout", method: 'post' }, {show:true,message:allMsgs.logout})
export const getLogList = (data:any) => request.post({ url: "/system/loglist", data })