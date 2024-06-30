<template>
  <n-form-item :label="label" :path="path">
    <n-transfer v-model:value="value![path]" style="width: 100%" :options="options" />
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

})
</script>

<style lang="scss" scoped></style>
