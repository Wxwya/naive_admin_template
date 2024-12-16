<template>
  <div class=" relative w-full h-[100vh]"
    :style="{ background: systemStore.theme ? systemStore.theme.common.bodyColor : '#fff' }">
    <!-- <n-button type="primary"  @click="login"> 
      login
    </n-button> -->
    <div class=" absolute left-1/2 top-1/2 rounded-lg px-8 py-5 -translate-x-1/2 -translate-y-1/2 " :style="mainStyle">
      <h1 class=" text-4xl text-center"
        :style="{ color: `${$qf(systemStore.theme ? systemStore.theme.common.bodyColor : '#fff', 3)}` }">
        Login</h1>
      <n-form :model="info">
        <n-form-item path="username" label="账号:">
          <n-input placeholder="请输入账号" v-model:value="info.account">
            <template #prefix>
              <span class="iconify solar--user-bold text-xl"></span>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="password" label="密码:">
          <n-input v-model:value="info.password"  :type="type" placeholder="请输入密码">
            <template #prefix>
              <span class="iconify  solar--password-bold text-xl"></span>
            </template>
            <template #suffix>
              <span  :class="`iconify cursor-pointer text-xl ${type==='password'?'solar--lock-password-bold-duotone':'solar--lock-password-unlocked-bold-duotone'}`" @click="type==='password'?type='text':type='password'"></span>
            </template>
          </n-input>
        </n-form-item>
         <n-form-item>
           <XwyaButton type="success"  text="登录" block @click="login" />
         </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TOKEN_KEY } from '@/enums/cacheEnums';
import useSystemStore from '@/store/useSystemStore';
import cache from '@/utils/cache';
const systemStore = useSystemStore()
const { push } = useRouter()
const { query } = useRoute()
const { proxy }: {proxy:CusProxy} = getCurrentInstance()
const info = reactive({
  account: '',
  password: ''
})
const type = ref("password")

const mainStyle = computed(() => {
  return {
    width: `${systemStore.pc ? '350px' : '90%'}`,
    background: systemStore.theme ? systemStore.theme.common.cardColor : '#fff',
    boxShadow: systemStore.theme ? '0 15px 25px rgba(0,0,0,.6)' : 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
  }
})
const login = async () => {
  const m = window.$msg.loading('登录中...', { duration: 0 })
  const res = await proxy.$api.system.login(info)
  if (res.code === 200) { 
    // localStorage.setItem('token', res.token)
    cache.setLocalStorage(TOKEN_KEY,res.token)
    push({ path: query.redirect ? query.redirect : '/', })
  }
  m.destroy()
}
</script>

<style lang="css" scoped>
:deep(.n-form-item-label__text) {
  @apply text-lg font-bold
}
</style>
