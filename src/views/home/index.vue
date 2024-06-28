<template>
  <div class="p-4">
    <div class="text-2xl font-bold py-10">查询示例</div>
    <!-- <Mycs  /> -->
     <MyForm label-placement="left" :item-list="queryFormItem" v-model="queryFormData" :row="6"  >
      <template #default="{ change,state }">
          <n-button type="tertiary" @click="dj(state,change)">
          {{ state ?'取消'  :'搜索' }}
        </n-button>
      </template>
     </MyForm>
     <div>
        <!-- <div class="w-full">1</div>
        <div>1</div>
        <div>1</div>
      </n-flex> -->

     </div>
  </div>
</template>
    <!-- <MyForm  :itemList="queryFormItem" v-model="queryFormData" /> -->
    <!-- :inline="inline"
    :label-width="labelWidth"
    :model="modelValue"
    :label-placement="(leblePotion as any)"
    :require-mark-placement="(starPotion as any)"
    :size="(size as any)" -->
<script setup lang="ts">
class QueryFormData {
  remarks = ''
  address = ""
}
 
const queryFormItem = [
  { label: '地址:', path: 'address', type: 'input', placeholder: '请输入地址' },
  { label: '备注:', path: 'remarks', type: 'input', placeholder: '请输入备注' },
  { label: '备注:', path: 'remarks1', type: 'input', placeholder: '请输入备注' },
  { label: '备注:', path: 'remarks2', type: 'input', placeholder: '请输入备注' },
  { label: '备注:', path: 'remarks3', type: 'input', placeholder: '请输入备注' },
  { label: '备注:', path: 'remarks4', type: 'input', placeholder: '请输入备注' },
  { label: '备注:', path: 'remarks5', type: 'input', placeholder: '请输入备注' },
  { label: '备注:', path: 'remarks6', type: 'input', placeholder: '请输入备注' },
  { label: '备注:', path: 'remarks7', type: 'input', placeholder: '请输入备注' },
]
const queryFormData = ref<QueryFormData>(new QueryFormData())
const clean = () => {
  // queryFormData.value = new QueryFormData()
  // queryStatus.value = false
  // pagination.page = 1
  // getList()

  console.log("清空");
}
const query = () => {
  console.log("查询");
  
  // queryStatus.value = true
  // pagination.page = 1
  // getList({ ...queryFormData.value })
}
const dj = (state,change) => {
  // console.log(d);
  change()
 }


</script>

<style lang="scss" scoped></style>
