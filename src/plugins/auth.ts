import { App } from "vue";

import useSystemStore from "@/store/useSystemStore";
function InitAuth(app: App) {
    app.directive('has', {
      mounted(el, binding) {
        const { permissions} = useSystemStore()
        if (!permissions.includes(binding.value)) { 
          el.remove()
        }
        },
    })
}
export default InitAuth;