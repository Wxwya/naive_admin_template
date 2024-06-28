<template>
  <n-form-item :label="label" :path="path">
  <n-date-picker value-format="yyyy.MM.dd HH:mm:ss" v-model:formatted-value="(value![path] as string)" :type="(type as any)" :clearable="true" />
</n-form-item>
</template>

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
  type: {
    type: String,
    default: 'date'
  }

})
</script>

<style scoped></style>
