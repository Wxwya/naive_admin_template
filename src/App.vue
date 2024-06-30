<template>
    <n-config-provider :locale="zhCN" :theme="systemStore.theme" :date-locale="dateZhCN" :theme-overrides="systemStore.theme === null ? lightThemeOverrides : darkThemeOverrides">
      <router-view></router-view>
    </n-config-provider>

</template>

<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui'
import useSystemStore from '@/store/useSystemStore';
import { GlobalThemeOverrides } from "naive-ui"
const systemStore = useSystemStore()
const lightThemeOverrides = {
  Switch: {
      railColor: 'rgba(0,0,0,.14)'
    }
  }

  const darkThemeOverrides = {
    Switch: {
      railColor: 'rgba(255,255,255,.2)'
    }
  }
</script>