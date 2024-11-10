<template>
 <!-- <Vertical /> -->
  <!-- <level /> -->
   <component :is="layout[systemStore.layout]" />
</template>

<script setup lang="ts">
import vertical from "./vertical.vue"
import level from "./level.vue";
import useSystemStore from "@/store/useSystemStore";
import useScreen from "@/hooks/useScreen";
useScreen()
const layout = { vertical,level}
const systemStore = useSystemStore()


</script>

<style  scoped>

</style>
