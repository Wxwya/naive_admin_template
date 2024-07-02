<template>
   <n-button v-bind="$attrs">
      <template #icon  v-if="icon">
        <n-icon :size="iconSize">
        <span :class="icon" ></span>
      </n-icon>
      </template>
      <span v-if="text">{{ text }}</span> 
      <template v-if="!text" #default>
        <slot></slot>
      </template>
    </n-button>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  iconSize: {
    type: [Number,String],
    default:24
  }
})
</script>

<style lang="scss" scoped></style>
