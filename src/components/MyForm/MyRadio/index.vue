<template>
<n-form-item :label="label" :path="path">
      <n-radio-group v-model:value="value![path]" name="radiogroup1">
          <n-radio v-for="(p,i) in options" :key="i" :value="(p as any).value" :label="(p as any).label">
          </n-radio>

      </n-radio-group>
    </n-form-item>
</template>

<script setup  lang="ts">
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
  }
})
</script>

<style  scoped></style>
