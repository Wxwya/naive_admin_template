<script lang="ts" setup>
const props = defineProps({
  delData: {
    type: Function,
    default: () => {},
  },
  upData: {
    type: Function,
    default: () => {},
  },
  toSub: {
    type: Function,
    default: () => {},
  }

})
const handlePositiveClick = () => { 
  props.delData()
}

</script>

<template>
  <div class=" flex gap-2 justify-center">
    <XwyaPopover text="修改">
          <XwyaButton @click="props.upData"  v-has="'xwya:menu:update'"  circle type="warning" iconSize="20" icon="iconify solar--pen-2-bold"  />
        </XwyaPopover>
        <XwyaRemind  :pop-config="{ onPositiveClick: handlePositiveClick, }"
        :tooltip-config="{ placement: 'top' }" pop-text="确认删除吗" tooltip-text="删除">
          <XwyaButton  v-has="'xwya:menu:delete'"  circle type="error" iconSize="20" icon="iconify solar--trash-bin-trash-bold"  />
        </XwyaRemind>
  </div>
</template>

<style lang="scss" scoped></style>
