import router from '@/router'
import useSystemStore from '@/store/useSystemStore'
// import pinia from './store/store'
// import { userStore } from './store'
// import { ElMessage } from 'element-plus'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
// import { getToken } from '@/utils/auth'
// import getPageTitle from '@/utils/get-page-title'
// const userStores = userStore(pinia)

// NProgress.configure({ showSpinner: false })
// const whiteList = ['/login'] //路由白名单

// router.beforeEach(async (to, from, next) => {
//   NProgress.start()
//   document.title = getPageTitle(to.meta.title)
//   const hasToken = getToken()

//   if (hasToken) {
//     if (to.path === '/login') {
//       next({ path: '/' })
//       NProgress.done()
//     } else {


//       const hasGetUserInfo = userStores.name
//       console.log(hasGetUserInfo);
//       if (hasGetUserInfo) {
//         if (from.path === '/login') {
//           await userStores.get_EnumKey()
//         }

//         console.log("走这里了", from, to);

//         if (from.path === '/login') {
//           await userStores.get_EnumKey()
//         }
//         next()


//       } else {
//         try {


//           // 去仓库获取信息
//           // await userStores.get_info()
//           await userStores.get_EnumKey()
//           await userStores.get_Name()
//           await userStores.get_imgUrl()
//           //  const route = useRoute()
//           //  console.log(route,"222222222222222");

//           setTimeout(() => {


//             router.push({ path: to.path, params: to.params, query: to.query });

//             next();

//           }, 200)



//           // next(`/login?redirect=${to.path}`)
//           // next()
//         } catch (error) {
//           // 删除令牌并转到登录页面重新登录


//           await userStores.resetToken()
//           ElMessage.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* 没有token */

//     if (whiteList.indexOf(to.path) !== -1) {


//       next()


//     } else {


//       next(`/login`)
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   NProgress.done()
// })
// const {loadingBar} = createDiscreteApi(['loadingBar'])

// 设置前置路由守卫
router.beforeEach( (to, from, next) => {
  const systemStore = useSystemStore()
  const token = localStorage.getItem('token')
  console.log(token);
  
  window.$bar.start()
  if (token) {
    if (!systemStore.routesAdded) {
       systemStore.getUserInfo();
      systemStore.routesAdded = true;
      next({ ...to, replace: true }); // 重新导航以触发新添加的路由
    } else {
      if (to.path === '/login') {
        next('/home');
      } else {
        next();
      }
    }
  } else { 
    if (to.path === '/login') {
      next()
    } else { 
      next("/login")
    }
  }
})
// 设置后置路由守卫
router.afterEach((to,from,next)=>{
    // 路由中导入-结束
    window.$bar.finish()
})