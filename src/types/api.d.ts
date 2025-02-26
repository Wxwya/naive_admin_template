type Api = {
  system: {
    login: (data: any) => Promise<any>,
    logout: () => Promise<any>,
    getLogList: (data: any) => Promise<any>,
  },
  user: {
    getUserinfo: () => Promise<any>,
    generateUser: (data: any) => Promise<any>,
    delUser: (data: any) => Promise<any>,
    changeUserStatus: (data: any) => Promise<any>,
    getUserList: (data: any) => Promise<any>,
  },
  role: {
    getRoleList: (data: any) => Promise<any>,
    getRoleInfo: (id: any) => Promise<any>,
    generateRole: (data: any) => Promise<any>,
    delRole: (data: any) => Promise<any>,
    getRoleOption: () => Promise<any>,
  },
  menu: {
    getMenuList: (data: any) => Promise<any>,
    getMenuOption: () => Promise<any>,
    generateMenu: (data: any) => Promise<any>,
    delMenu: (data: any) => Promise<any>,
    getMenuInfo: (id: any) => Promise<any>,
    changeMenuStatus: (data: any) => Promise<any>,
    getSubMenuList: (data: any) => Promise<any>,
  },
  permissions: {
    getPermissionsList: (data: any) => Promise<any>,
    generatePermissions: (data: any) => Promise<any>,
    delPermissions: (data: any) => Promise<any>,
    getPermissionsInfo: (id: any) => Promise<any>,
    getPermissionsOptions: () => Promise<any>,
  },
  dict: {
    getDictList: (data: any) => Promise<any>,
    generateDict: (data: any) => Promise<any>,
    delDict: (data: any) => Promise<any>,
    getDictInfo: (id: any) => Promise<any>,
    getDictType: (type: string) => Promise<any>,
    getDictTypeList: (data: string) => Promise<any>,
    delDictType: (data: any) => Promise<any>,
    generateDictType: (data: any) => Promise<any>,
    changeDictStatus: (data: any) => Promise<any>,
  }
}