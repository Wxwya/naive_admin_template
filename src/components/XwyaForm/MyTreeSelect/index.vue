<script lang="ts" setup>
defineProps({
  value: {
    type: Object,
    default: void 0,
  },
  label: {
    type: String,
    default: ''
  },
  path: {
    type: String,
    default: ''
  },
  rules: {
    type: Array,
    default: () => []
  },
  style: {
    type: Object,
    default: () => ({})
  },
  isShow: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <n-form-item  v-show="isShow" :label="label" :style="style" :path="path" :rule="rules" :key="path+isShow">
    <n-tree-select v-model:value="value![path]" v-bind="$attrs" />
  </n-form-item>
</template>

<style lang="scss" scoped></style>
