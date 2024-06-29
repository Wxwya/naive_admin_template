<template>
  <n-form-item :label="label" :path="path" :rule="rules" v-bind="$attrs"  >
    <!-- v-model:value="formValue.name" -->
      <n-input v-model:value=" value![path]"  :placeholder="placeholder" />
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
    default: ()=>[]
   }
 })

</script>

<style  scoped></style>
