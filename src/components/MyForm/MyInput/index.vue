<template>
  <n-form-item :label="label" :path="path" :rule="rules" v-bind="$attrs"  >
    <!-- v-model:value="formValue.name" -->
      <n-input v-model:value=" value![path]" :type="nativeType"     :placeholder="placeholder" />
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
   },
   nativeType: {
     type: String,
     default: 'text'
   },


 })

 defineEmits(['update:value'])

 defineExpose({
   value: ()=>{
     return formValue.value
   }
 })

 const formValue = computed({
   get: ()=>{
     return value.value
   },
   set: (val)=>{
     formValue.value = val
     emit('update:value', val)
   }
 })

</script>

<style lang="css"  scoped>

</style>
