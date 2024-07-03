import router from '@/router'
import useSystemStore from '@/store/useSystemStore'
import settings from '@/settings'

router.beforeEach((to, from, next) => {

  
  
  const systemStore = useSystemStore()
  const token = localStorage.getItem('token')
  window.$bar.start()
  if (token) {
    if (!systemStore.routesAdded) {
       systemStore.getUserInfo();
      systemStore.routesAdded = true;
      next({ ...to, replace: true }); 
    } else {
      if (to.path === '/login') {
        next('/');
      } else {
        next();
      }
    }
  } else { 
    if (to.path === '/login') {
      next()
    } else { 
      next(`/login?redirect=${to.path}`)
    }
  }
})
router.afterEach((to,from,next)=>{
  window.$bar.finish()
  document.title =`${to.meta.title?settings.title+'-'+to.meta.title:settings.title}`
})