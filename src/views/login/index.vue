<template>
  <div class="">
    <n-button type="primary"  @click="login"> 
      login
    </n-button>
    <n-button type="primary"  @click="toHome"> 
      toHome
    </n-button>
    <n-button type="primary"  @click="setToken"> 
      setToken
    </n-button>
    <n-button type="primary"  @click="removeToken"> 
      removeToken
    </n-button>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/useSystemStore';
const systemStore = useSystemStore()
const router = useRouter()
const login = () => {
  setToken()
  toHome()
}
const toHome = () => { 
  router.push('/')
}
const setToken = () => { 
  systemStore.setToken()
}
const removeToken= () => { 
  localStorage.removeItem('token')
}
</script>

<style lang="scss" scoped></style>
