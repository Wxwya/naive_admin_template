<template>
  <n-form-item :label="label" :path="path" :rule="rules" v-bind="$attrs">
    <n-auto-complete v-model:value="value![path]" :input-props="{
      autocomplete: 'disabled'
    }" :options="options" :placeholder="placeholder" clearable />
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
  placeholder: {
    type: String,
    default: ''
  },
  rules: {
    type: Array,
    default: () => []
  },
  nativeType: {
    type: String,
    default: 'text'
  },
  options: {
    type: Array,
    default: () => []
  },

})





</script>

<style lang="css" scoped></style>
