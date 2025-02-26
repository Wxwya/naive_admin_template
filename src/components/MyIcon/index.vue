<script lang="ts" setup>
defineProps({
  icon: {
    type: String,
    required: true,
    
  },
  className: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <span :class="`iconify ${icon} ${className} `"></span>
</template>

<style lang="scss" scoped></style>
