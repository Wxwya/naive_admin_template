import api from '@/api';
import mitt from 'mitt';
import router from "@/router"
import store from '@/store';
import  '@/icon';
import "./naive"
import "@/router/permission"
import { handleColorReversal, toHexToRGB } from "@/utils/handleColor"
import useSystemStore from '@/store/useSystemStore';
import InitAuth from './auth';
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: Api; 
    $mitt: Mitt;
    $qf: (color: string, ilighten: number) => string;
    $htor: (color: string, opacity: number) => string;
  }
}
const init = (app: any) => {
  
  app.use(router)
  app.use(store)
  InitAuth(app)
  const systemStore = useSystemStore()
  app.config.globalProperties.$api = api
  app.config.globalProperties.$mitt = mitt()
  app.config.globalProperties.$qf = handleColorReversal
  app.config.globalProperties.$htor = toHexToRGB
  
}
export default init