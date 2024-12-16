import router from '@/router'
import useSystemStore from '@/store/useSystemStore'
import settings from '@/settings'
import cache from '@/utils/cache'
import { TOKEN_KEY } from '@/enums/cacheEnums'

router.beforeEach(async (to, from, next) => {

  const systemStore = useSystemStore()
  const token = cache.getLocalStorage(TOKEN_KEY)
  window.$bar.start()
  if (token) {
    if (!systemStore.routesAdded) {
      await systemStore.getUserInfo();
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