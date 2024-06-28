<template>
  <n-form-item :label="label" :path="path">
    <n-select style="min-width:200px" v-model:value="value![path]" :placeholder="placeholder"  :options="(options as SelectOption[])" />
  </n-form-item>
</template>

<script setup lang="ts">
import type { SelectOption } from "naive-ui";
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
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: void 0
  }
})
</script>

<style lang="scss" scoped></style>
