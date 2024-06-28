<template>
  <n-layout has-sider>
    <n-layout-sider collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="collapsed" show-trigger
      @collapse="collapsed = true" @expand="collapsed = false" bordered>
      <div>
        <img :src="getImgUrl" class="w-full h-[54px]"
        alt="logo">
        <n-menu   :render-icon="renderMenuIcon" :default-value="path" @update:value="onUpdareValue" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :options="routes"  />
      </div>
    </n-layout-sider>

    <n-layout class="h-[100vh]">
      <n-layout-header class="w-full h-[64px] pr-[30px]" bordered>
        <n-flex justify="end" class="h-full" align="center">
          <Down />
        </n-flex>
      </n-layout-header>
      <n-layout :native-scrollbar="false">
        <router-view v-slot="{ Component }">
          <transition appear name="fade-transform" mode="out-in">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">

import Down from "./down.vue"
import useLayout from './useLayout'
const { collapsed, routes, path, onUpdareValue,renderMenuIcon } = useLayout()
const getImgUrl = computed(() => {
  return collapsed.value ?'https://img1.baidu.com/it/u=3430690511,3867923153&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=453':'https://upload.shejihz.com/2020/02/961c95fffbdd3ecc99fdb4e33faa8237.jpg'
})

</script>

<style scoped></style>
