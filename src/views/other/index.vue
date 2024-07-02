<template>
  <div class="p-4">
    <div class="border-0 border-l-4 border-solid border-green-400 text-2xl font-bold pl-4 ">按钮用法</div>
    <div class="py-10">
      <NSpace>
        <MyButton type="info" :iconSize="30" size="large" text="按钮111" icon="iconify-color emojione-v1--baby-chick" />
        <MyButton type="error" text="error" /> 
        <MyButton tertiary circle iconSize="30" icon="iconify-color emojione-v1--bear-face" size="large" />
      </NSpace>
    </div>
    <div class="border-0 border-l-4 border-solid border-green-400 text-2xl font-bold pl-4 ">确认弹出框示例</div>
    <div class="py-10">
      <MyPopconfirm @positive-click="handlePositiveClick" @negative-click="handleNegativeClick" text="11111111111111">
        <template #trigger>
          <n-button>引用</n-button>
        </template>
      </MyPopconfirm>
    </div>
    <div class="border-0 border-l-4 border-solid border-green-400 text-2xl font-bold pl-4 ">确认信息框示例</div>
    <div class="py-10">
      <MyPopover text="22222222222222222222222">
        <template #trigger>
          <MyButton type="info"  icon="iconify-color emojione-v1--baby-chick" />
        </template>
      </MyPopover>
    </div>
    <div class="border-0 border-l-4 border-solid border-green-400 text-2xl font-bold pl-4 ">tabs示例(默认不是使用面板)</div>
    <div class="py-10">
      <MyTabs :tablist="['tab1', 'tab2', 'tab3']"></MyTabs>
    </div>
    <div class="border-0 border-l-4 border-solid border-green-400 text-2xl font-bold pl-4 ">tabs示例使用面板</div>
    <div class="py-10">
      <MyTabs :pane="true" :tablist="tablist"></MyTabs>
    </div>
  </div>
</template>

<script setup lang="ts">
const tablist = [
  { name: "tabs1", children: h("div", {}, 'Hello1' )},
  {name:"tabs2",children: h("div", {}, 'Hello2' )},
  {name:"tabs3",children: h("div", {}, 'Hello3' )},
 ]
const handlePositiveClick = () => {
  window.$msg.info('是的')
}
const handleNegativeClick = () => {
  window.$msg.info('并不')
}
</script>

<style lang="scss" scoped></style>
