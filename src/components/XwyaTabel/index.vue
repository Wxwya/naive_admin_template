<template>
    <n-data-table  
    :remote="true" 
    bordered
    @update:checked-row-keys="(onSelect as Function)" 
    :bordered="false" 
    :single-line="false" 
    :columns="(columns as any)" 
    :data="(data as any)" 
    :pagination="(pagination as NaiveUI.PaginationProps)"   
    :paginate-single-page="false" 
    :loading="loading" 
    :striped="true"
    :row-key="(r)=>r.id"
    v-bind="$attrs"  >
    
    <template  v-for="(value, name) in $slots" #[name] :key="name">
      <slot :name="name" :slot="value"></slot>
    </template>
    </n-data-table>
</template>

<script lang="ts" setup>
import type {PaginationProps} from "naive-ui";
defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  pagination: {
    type: Object,
    default: () => { }
  },
  onSelect: {
    type: Function,
    default: () => {}
  }
})



</script>

<style lang="scss" scoped></style>
