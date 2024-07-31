import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import layout from '@/layouts';
declare module 'vue-router' {
    interface _RouteRecordBase {
        hidden?: boolean;
        alwaysShow?: boolean;
    }
}
export const pageRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect: '/form',
    children: [
      {
        path: '/form',
        name: 'form',
        meta: { title: '表单示例', icon: 'emojione-v1--keycap-1' },
        component: () => import('@/views/form/index.vue'),
      },
    ],
  }
]
export const asyncPageRoutes: Array<RouteRecordRaw> = [
  {
    path: '/table',
    name: 'table',
    meta: { title: '表格示例', icon: 'emojione-v1--keycap-2' },
    component: () => import('@/views/table'),
  },
  {
    path: '/other',
    name: 'other',
    meta: { title: '其他示例', icon: 'emojione-v1--keycap-7' },
    component: () => import('@/views/other'),
  },
  {
    path: '/info',
    name: 'info',
    redirect: '/posts',
    meta: { title: '测试二级路由', icon: 'emojione-v1--keycap-3' },
    children: [
      {
        path: '/info/posts',
        name: 'posts',
        meta: { title: '文章',icon: 'emojione-v1--keycap-4' },
        component: () => import('@/views/posts'),
      },
      {
        path: '/info/chart',
        name: 'chart',
        meta: { title: '图表', icon: 'emojione-v1--keycap-5' },
        component: () => import('@/views/chart'),
      },
      {
        path: '/info/user',
        name: 'user',
        meta: { title: '用户管理', icon: 'emojione-v1--keycap-6' },
        component: () => import('@/views/user'),
      },
    ]
  },
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
