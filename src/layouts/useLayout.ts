import { storeToRefs } from "pinia"
import useSystemStore from "@/store/useSystemStore";
const useLayout = () => { 
  const { push } = useRouter()
  const r = useRoute()
  const path = ref('')
  const { routes,collapsed,pc } = storeToRefs(useSystemStore())
  const onUpdareValue = (key: string) => {
    if (!pc.value) { 
      collapsed.value=false
    }
    push(key)
  }
  const renderMenuIcon = (option: NaiveUI.MenuOption) => {
    return option.icon?h(option.icon):false
  }
  watch(() => r.path, () => { 
    path.value = r.path
  }, { immediate: true })
  return {
    routes,
    collapsed,
    path,
    onUpdareValue,
    renderMenuIcon,
    pc
  }
}
export default useLayout;