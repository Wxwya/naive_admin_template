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
          <XwyaButton v-has="'xwya:permission:update'" @click="props.upData"   circle type="warning" iconSize="20" icon="iconify solar--pen-2-bold"  />
        </XwyaPopover>
        <XwyaPopover text="按钮权限管理">
          <XwyaButton  v-has="'xwya:permission:bnt'"  @click="props.toSub"  circle type="primary" iconSize="20" icon="iconify solar--align-left-bold "  />
        </XwyaPopover>
        <!-- iconify solar--align-left-bold -->
        <XwyaRemind  :pop-config="{ onPositiveClick: handlePositiveClick, }"
        :tooltip-config="{ placement: 'top' }" pop-text="确认删除吗" tooltip-text="删除">
          <XwyaButton v-has="'xwya:permission:delete'"   circle type="error" iconSize="20" icon="iconify solar--trash-bin-trash-bold"  />
        </XwyaRemind>
  </div>
</template>

<style lang="scss" scoped></style>
