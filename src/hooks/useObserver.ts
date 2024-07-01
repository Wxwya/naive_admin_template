const useObserver = (start,end,f) => {
  const root = ref(null)
  // const childrenEl = ref(null)
  const ob = ref(null)
  const options = {
    root: root.value, // 根元素，默认是视窗
    threshold: 0.3, // 当目标元素  进入视窗时触发回调 0-1
  };
  // 初始化
  const initObserver = () => {
    ob.value = new IntersectionObserver(observerCallback, options)
    startEl()
  }
  const startEl = () => { 
    console.log(123);
    const elarr = [document.querySelector(`#${start}`),document.querySelector(`#${end}`)]
    
    console.log(elarr);
    elarr.forEach(el => { 
      if (el) { 
        ob.value.observe(el)
      }
    })
    
  }
  const observerCallback = (entries) => {
    console.log(entries);
    // // 第一项
    // // 最后一项
    // console.log(entries[entries.length - 1]);
    
    if (entries[0].isIntersecting && entries[0].target.id === start) {
    console.log(entries[0].target.id);
      console.log('头部进入视窗');
    }
    if (entries[0].isIntersecting && entries[0].target.id === end) {
      console.log(entries[0].target.id);
      console.log('尾部进入视窗');
      f()
      }
    // if (entries[entries.length - 1].isIntersecting) {
    //   console.log('离开视窗');
    // }
    
  }
  onMounted(() => { 
    initObserver()
  })
  return {
    root,
    startEl
  }
}
export default useObserver