<template>
  <n-tooltip v-bind="$attrs">
    <template  #trigger>
      <slot ></slot>
    </template>
      {{ text }}
   
  </n-tooltip>
</template>

<script setup lang="ts">
const { proxy: Proxys } = getCurrentInstance() as any;

defineProps({
  text: {
    type: String,
    default: ''
  }
})
const getname = (name) => { 
  return name === 'default' ? 'trigger':name
}
</script>

<style lang="scss" scoped></style>
