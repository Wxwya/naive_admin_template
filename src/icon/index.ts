import { App } from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue"
const svgs = import.meta.glob('./svg/*.svg',{ eager: true })
export function registerIcons(app: App) {
  app.component('svg-icon', SvgIcon as any)
}
