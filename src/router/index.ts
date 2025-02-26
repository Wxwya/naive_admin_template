import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import { deepClone} from "@/utils/handle"
import layout from '@/layouts';
declare module 'vue-router' {
    interface _RouteRecordBase {
        hidden?: boolean;
        alwaysShow?: boolean;
    }
}

export let pageRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect: '/form',
    children: [
      {
        path: '/form',
        name: 'form',
        title: '表单示例',
        icon: 'ic--outline-filter-1',
        component: () => import('@/views/form/index.vue'),
      },
      {
        path: '/table',
        name: 'table',
        title: '表格示例',
        icon: 'ic--outline-filter-2',
        component: () => import('@/views/table'),
      },
      {
        path: '/other',
        name: 'other',
        title: '其他示例',
        icon: 'ic--outline-filter-3',
        component: () => import('@/views/other'),
      },

      {
        path: '/info',
        name: 'info',
        redirect: '/posts',
        title: '测试二级路由',
        icon: 'ic--outline-filter-4',
        children: [
          {
            path: '/info/posts',
            name: 'posts',
            title: '文章',
            icon: 'ic--outline-filter-5',
            component: () => import('@/views/posts'),
          },
          {
            path: '/info/chart',
            name: 'chart',
            title: '图表',
            icon: 'ic--outline-filter-6' ,
            component: () => import('@/views/chart'),
          },
          {
            path: '/info/user',
            name: 'user',
            title: '用户管理',
            icon: 'ic--outline-filter-7',
            component: () => import('@/views/user'),
          },
        ]
      },
    ],
  }
]
export const getPageRoutes = () => deepClone(pageRoutes) 
export const asyncPageRoutes: Array<RouteRecordRaw> = [

]
export const noLoyoutRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    hidden: true
  },

]
export const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*', // 捕获所有未匹配的路由
    component: ()=>import("@/views/404"),
    hidden: true
  },
]

const _createRouter = () =>
    createRouter({
        // history: createWebHistory(),
        history: createWebHashHistory(), //哈希模式
      scrollBehavior: () => ({ top: 0 }),
        routes: [...noLoyoutRoutes]
    });

let router = _createRouter();
export function resetRouter() {
  router = _createRouter();
}
export default router;
