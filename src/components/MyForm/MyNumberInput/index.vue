<template>
  <n-form-item :label="label" :path="path" :rule="rules" v-bind="$attrs"  >
    <n-input-number style="width: 100%;" v-model:value=" value![path]" :placeholder="placeholder" button-placement="both" />
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
    default: ()=>[]
   },
   placeholder: {
    type: String,
    default: ''
   },
 })



</script>


