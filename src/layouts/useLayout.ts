import { storeToRefs} from "pinia"
import useSystemStore from "@/store/useSystemStore";
const useLayout = () => { 
  const systemStore = useSystemStore()
  const { push } = useRouter()
  const r = useRoute()
  const path = ref('')
  
  const { routes } = storeToRefs(systemStore)
  const collapsed = ref(false)
  const onUpdareValue = (key:string) => {
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
    renderMenuIcon
  }
}
export default useLayout;