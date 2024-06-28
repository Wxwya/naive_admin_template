import { defineStore } from 'pinia'
import router, { pageRoutes, noLoyoutRoutes, asyncPageRoutes, staticRoutes } from '@/router'
import { darkTheme } from 'naive-ui'
const useSystemStore = defineStore('system', {
  state: () => ({
    layout: 'level', // 默认布局 level(水平) vertical(垂直)
    permissions: ["user","info","chart","about","posts"],
    routes: [],
    routesAdded: false,
    theme: null, // naiveui主题 darkTheme 或 null
  }),
  actions: {
    changeLayout() {
      this.layout = this.layout === 'vertical' ? 'level' : 'vertical'
    },
    getUserInfo() {
      // 发请求获取用户信息逻辑
      this.addRoutes()
    },

    changeTheme() {
      this.theme = this.theme != null ? null : darkTheme
    },
    addRoutes() {
      console.log('开始添加路由')
      const asyncRoutes = this.handlePermissionsRoutes(asyncPageRoutes)
      if (asyncRoutes.length) { 
        pageRoutes[0].children=[...pageRoutes[0].children,...asyncRoutes]
      } 
      const routes = [...pageRoutes,...staticRoutes]
      routes.forEach((item) => {
        router.addRoute(item)
      })
      // 处理导航栏路由
      this.routes = this.handleNav(pageRoutes[0].children)
      console.log('添加路由完成')
    },
    handlePermissionsRoutes(routes) {
      return routes.filter(item => { 
        if (item.children && item.children.length > 0) { 
          item.children = this.handlePermissionsRoutes(item.children)
        }
        return this.permissions.includes(item.name)
      })
    },
    handleNav(routes) {
      return routes.map((item) => {
        let p = { label: item.meta.title, key: item.path }
          item.meta.icon? p.icon = () => h('span', { class: `iconify-color ${item.meta.icon}` }):''
        if (item.children && item.children.length > 0) {
          if (item.children.length == 1) {
              item.children[0].meta.icon? p.icon = () => h('span', { class: `iconify-color ${item.children[0].meta.icon}` }):''
            p.title = item.children[0].meta.title
            p.key = item.children[0].path
          } else { 
            p.children = this.handleNav(item.children)
          }
        }
        return p
      })
    },
    setToken() {
      localStorage.setItem('token', '123456')
    },
  },
  // 开启数据缓存
  persist: {
    key: 'system',
    storage: localStorage,
    // 通过 paths 属性指定需要持久化的属性
    paths: ['layout', 'theme'],
  },
})
export default useSystemStore
