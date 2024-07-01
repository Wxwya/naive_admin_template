<template>
  <div class="p-4">
    <div class="border-0 border-l-4 border-solid border-green-400 text-2xl font-bold pl-4 ">
      h5 下拉刷新/上拉加载 容器
    </div>
    <!-- <div class=" mt-10 h-96 bg-slate-500 overflow-y-auto"> -->
      <n-layout ref="root" class="mt-10 h-96 bg-slate-500 px-4 select-none " :native-scrollbar="false">
          <div :id="index===0?`start`:index===list.length-1?`end`:''" class=" h-20 leading-[80px] font-bold text-2xl" v-for="(p,index) in list" :key="index">
        {{ index+1  }}. 古道西风瘦马
        </div>
      
    </n-layout>
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
import useObserver from '@/hooks/useObserver'
import { ref } from 'vue';
const list = ref([])
const data = () => { 
  return new Promise((resolve, reject) => {
    setTimeout(() => { 
      resolve(Array.from({length:10}))
    },1500)
  })
}
const getData = async () => { 
  const res = await data()
  list.value = [...list.value, ...res]
  nextTick(() => { 
    startEl()
  })
}
const { root,startEl } = useObserver('start', 'end',getData)

onMounted(() => { 
  getData()
})
// const { root
// const aaa= ref(null)
// const aa = () => { 
//    new IntersectionObserver
// }
</script>

<style  scoped></style>
