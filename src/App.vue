<template>
  <n-config-provider :locale="zhCN" :theme="systemStore.theme" :date-locale="dateZhCN">
    <router-view></router-view>
  </n-config-provider>

</template>

<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui'
import useSystemStore from '@/store/useSystemStore';
const systemStore = useSystemStore()

</script>