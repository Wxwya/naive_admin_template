import { storeToRefs } from "pinia";
import useSystemStore from "@/store/useSystemStore";
const WIDTH = 992 // 重新计算宽度
const useScreen = () => {
  
  const { body } = document
  const { pc,collapsed  } = storeToRefs(useSystemStore())
  const isMobile = () => {
      const rect = body.getBoundingClientRect()    
      return rect.width - 1 < WIDTH
  }
  const resizeHandler = () => {
    if (!document.hidden) {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      const is = isMobile()
      // true移动端，falsepc端
      pc.value = !is
      if (is) {
        collapsed.value = false
      }
    }
  }

  onBeforeMount(() => {
    window.addEventListener('resize', resizeHandler)
  })
  onBeforeUnmount(() => {
    // 关闭页面监听
    window.removeEventListener('resize', resizeHandler)
  })
  onMounted(() => {
    const is = isMobile()
    if (is) {
      pc.value = !is
      collapsed.value = false
    }

  })
}
export default useScreen;