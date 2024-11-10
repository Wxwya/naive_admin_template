import request from "@/utils/fetch"
import { allMsgs } from "@/config/message"

export const login = (data:any) => request({ url: "/system/login", method: 'post', data },true)
export const logout = () => request({ url: "/system/logout", method: 'post' },true,allMsgs.logout)
export const getLogList = (data:any) => request({ url: "/system/loglist", method: 'post', data })