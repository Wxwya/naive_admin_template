import { defineStore } from 'pinia'
import router, { getPageRoutes, noLoyoutRoutes, asyncPageRoutes, staticRoutes,resetRouter } from '@/router'
import { getUserInfo as getUserInfoApi } from '@/api/user'

import { darkTheme } from 'naive-ui'
import { markRaw } from 'vue'
import MyIcon from "@/components/MyIcon"
import cache from '@/utils/cache'
const useSystemStore = defineStore('system', {
  state: () => ({
    layout: 'level', // 默认布局 level(水平) vertical(垂直)
    permissions: [],
    routes: [],
    routesAdded: false,
    theme: null, // naiveui主题 darkTheme 或 null
    pc: true,
    collapsed: false,
    userInfo: {},
  }),
  actions: {
    changeLayout() {
      this.layout = this.layout === 'vertical' ? 'level' : 'vertical'
    },
    async getUserInfo() {
      // 发请求获取用户信息逻辑
      const res = await getUserInfoApi()
      if (res.code === 200) { 
        this.userInfo= res.data
        this.permissions = res.data.permissions
        this.handleRoutes(res.data.routes)
      }      
      
    },

    changeTheme() {
      this.theme = this.theme != null ? null : markRaw(darkTheme) 
    },
    addRoutes(asyncRoutes) {
      console.log('开始添加路由', asyncRoutes)
      let pageRoutes = getPageRoutes() 
      console.log("pageRoutes",pageRoutes);
      
      // const asyncRoutes = this.handlePermissionsRoutes(asyncPageRoutes)
      if (asyncRoutes.length) { 
        pageRoutes[0].children=[...pageRoutes[0].children,...asyncRoutes]
      } 
      // console.log(pageRoutes[0]);
      
      const routes = [...pageRoutes,...staticRoutes]
      routes.forEach((item) => {
        router.addRoute(item)
      })
      // 处理导航栏路由
      this.routes = this.handleNav(pageRoutes[0].children)
     
     
      console.log('添加路由完成',this.routes)
    },
    handleRoutes(routes) { 
      const newRoutes = []
      if (routes) { 
        routes.forEach((item) => {
          if (item.children && item.children.length > 0) {
            item.children = item.children.map((p) => {
              // console.log(p, "@@@");
              const arr = p.path.split('/')
              p.component = () => import(`@/views/${arr[2]}/index.vue`)
              // 
              return p
              
            })
          } else { 
            item.component = () => import(`@/views/${item.path.replace('/', '')}/index.vue`)
          }
          newRoutes.push(item)
        })
      }
      this.addRoutes(newRoutes)
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
        if (item.hidden) return 
        let p = { label: item.title, key: item.path }
        item.icon ? p.icon = () => h(MyIcon, { icon:item.icon  }) : ''
        console.log(item.icon);
        
        if (item.children && item.children.length > 0) {
          if (item.children.length == 1) {
            item.children[0].icon ? p.icon = () => h(MyIcon, {icon:item.children[0].icon}) : ''
            console.log(item.children[0].icon);
            p.title = item.children[0].title
            p.key = item.children[0].path
          } else { 
            p.children = this.handleNav(item.children)
          }
        }
        return p
      }).filter(Boolean)
    },
    resetStore() { 
      cache.remove('token')
      this.$reset()
      resetRouter()
    }

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
