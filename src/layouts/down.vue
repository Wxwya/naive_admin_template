<template>
  <n-dropdown :options="options"  trigger="click" @select="handleSelect">
    <!-- <n-button>xwya</n-button> -->
    <n-space class=" items-center">
      <n-avatar v-if="settings.avatar" round size="small" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
      <div>xwya</div>
    </n-space>
  </n-dropdown>
</template>

<script setup lang="ts">
import { h, defineComponent } from 'vue'
import type { Component } from 'vue'
import { NIcon } from 'naive-ui'
import useSystemStore from '@/store/useSystemStore'
import settings from '@/settings'
const systemStore = useSystemStore()
const { proxy }: { proxy: CusProxy } = getCurrentInstance()
const { push } = useRouter()
const options = [
  {
    label: '用户资料',
    key: 'profile',
  },
  {
    label: '切换布局',
    key: 'editProfile',
  },
  {
    label: '切换主题',
    key: 'theme',
  },
  {
    label: '退出登录',
    key: 'logout',
  }
]
const handleSelect = (key: string | number) => { 
  switch (key) { 
    case 'editProfile':
    systemStore.changeLayout()
      // console.log('editProfile');
      break;
    case 'theme':
      systemStore.changeTheme()
      break;
    case 'logout':
      logout()
      break;
    default:
      console.log('default');
      break;
  }
}
const logout = async () => { 
  const res = await proxy.$api.system.logout()
  if (res.code === 200) { 
    systemStore.resetStore()
    push("/login")
  }
}
</script>

<style lang="scss" scoped></style>
