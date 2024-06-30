<template>
  <n-form-item :label="label" :path="path" :rule="rules" v-bind="$attrs">
    <n-switch v-model:value="value![path]" />
  </n-form-item>
</template>

<script setup lang="ts">
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

})



</script>

<style lang="css" scoped>
/* rgba(255, 0, 0, .14) */
:deep(.n-switch) {
  /* --n-rail-color: "" !important; */
}
/* --n-rail-color */
</style>