<template>
  <n-layout>
    <n-layout-header class="w-full h-[64px] pr-[30px]" bordered>
      <n-flex justify="space-between" class="h-full" align="center">
        <div class="pl-4" v-if="!pc">
            <span class="iconify gg--menu-cheese text-4xl" @click="collapsed = !collapsed"></span>
          </div>
        <img v-else src="https://upload.shejihz.com/2020/02/961c95fffbdd3ecc99fdb4e33faa8237.jpg" class="w-[400px] h-full"
          alt="logo">
        <Down />
      </n-flex>
    </n-layout-header>
    <n-layout class="h-[calc(var(--vh,1vh)*100-64px)]" has-sider>
      <n-layout-sider v-if="pc" collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="collapsed" show-trigger
        @collapse="collapsed = true" @expand="collapsed = false" bordered>
        <n-menu   :render-icon="renderMenuIcon" :default-value="path" @update:value="onUpdareValue"  :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :options="routes" />
      </n-layout-sider>
      <n-layout :native-scrollbar="false">
          <router-view v-slot="{ Component }">
            <transition appear name="fade-transform" mode="out-in">
              <!-- <keep-alive :exclude="['SubMenu','BuSiness','subDict','ButtonPermissions']"> -->
                <component :is="Component" />
              <!-- </keep-alive> -->
            </transition>
          </router-view>
      </n-layout>
    </n-layout>
    <n-drawer v-if="!pc" v-model:show="collapsed" :width="200" placement="left">
      <n-menu :render-icon="renderMenuIcon" :default-value="path" @update:value="onUpdareValue" :collapsed="!collapsed"
          :collapsed-width="64" :collapsed-icon-size="22" :options="routes" />
    </n-drawer>
  </n-layout>
</template>

<script setup lang="ts">
import Down from "./down.vue"
import useLayout from './useLayout'
const { collapsed,routes,path,onUpdareValue,renderMenuIcon,pc} = useLayout()

</script>

<style scoped>

</style>
