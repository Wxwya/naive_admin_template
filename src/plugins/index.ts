import api from '@/api';
import mitt from 'mitt';
import router from "@/router"
import store from '@/store';
import { registerIcons} from '@/icon';
import "./naive"
import "@/router/permission"
import { handleColorReversal, toHexToRGB } from "@/utils/handleColor"
import useSystemStore from '@/store/useSystemStore';
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: Api; 
    $mitt: Mitt;
    $cfz: (color: string, ilighten: number) => string;
    $htor: (color: string, opacity: number) => string;
    $theme: NaiveUI.GlobalTheme | null;
  }
}
const init = (app: any) => {
  app.use(router)
  app.use(store)
  registerIcons(app)
  const systemStore = useSystemStore()
  app.config.globalProperties.$api = api
  app.config.globalProperties.$mitt = mitt()
  app.config.globalProperties.$cfz = handleColorReversal
  app.config.globalProperties.$htor = toHexToRGB
}
export default init