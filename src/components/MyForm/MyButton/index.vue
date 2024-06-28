<template>
  <n-form-item>
    <n-button attr-type="button" :type="(bntType as any)" @click="queryAndEmpyt">
      <!-- <n-icon size="20" color="#ffffff">
        <Search v-if="bntType==='primary'"  />
        <CloseOutline v-else />
      </n-icon> -->
      {{  bntType==='primary'?'查':'清' }}
    </n-button>
  </n-form-item>
</template>

<script setup  lang="ts">
const bntType = ref('primary')
const props = defineProps({
  query: {
    type: Function,
    default: () => {},
  },
  clean: {
    type: Function,
    default: () => {},
  },
  change: {
    type: Function,
    default: () => {},
  },
})
const queryAndEmpyt = () => {
  if (bntType.value === 'error') {
    bntType.value = 'primary'
    props.clean()
  } else {
    bntType.value = 'error'
    props.query()
  }
  props.change()
}
</script>

<style  scoped></style>
