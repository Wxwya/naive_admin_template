<template>
  <div class="p-4">
    <div class="border-0 border-l-4 border-solid border-green-400 text-2xl font-bold pl-4 ">查询示例</div>
     <MyForm class="m-10" label-placement="left" :item-list="queryFormItem" v-model="queryFormData" :row="7"   >
      <template #default="{ change,state }">
          <n-button :type="!state?'primary':'error'" @click="dj(state,change)">
          {{ state ?'取消'  :'搜索' }}
        </n-button>
      </template>
     </MyForm>
     <div class="border-0 border-l-4 border-solid border-green-400 text-2xl font-bold pl-4 ">正常表格示例</div>
     <div class="m-10 w-[700px]">
      <MyForm  label-placement="left" :item-list="queryFormItem2" v-model="queryFormData" :row="3"   >
      <template #default>
        <div class="w-full flex justify-center gap-4">
          <n-button type="primary" @click="submit"> 提交</n-button>
        <n-button>取消</n-button>
        </div>
        
      </template>
     </MyForm>
     </div>
  </div>
</template>

<script setup lang="ts">
class QueryFormData {
  remarks = ''
  address = ""
}
 
const queryFormItem = [
  { label: '地址:',  path: 'address', type: 'input', placeholder: '请输入地址' },
  { label: '备注:', path: 'remarks', type: 'select', placeholder: '请输入备注',options: [{ label: "选项1", value: 1 }, {label:"选项2",value:2}] },
  { label: '备注:', path: 'remarks1', type: 'input', placeholder: '请输入备注' },
  { label: '备注:', path: 'remarks2', type: 'input', placeholder: '请输入备注' },
]
const queryFormItem2 = [
  { label: '输入框input', path: 'address', itemwidth: '100%', type: 'input', placeholder: '请输入地址' },
  { label: '多选select:', path: 'remarks1111', itemwidth: '100%',type: 'select',multiple:true, placeholder: '请输入备注',options: [{ label: "选项1", value: 1 }, {label:"选项2",value:2}, {label:"选项2",value:3}, {label:"选项4",value:4}] },
  { label: '单选select:', path: 'remarks6666', type: 'select', placeholder: '请输入备注',options: [{ label: "选项1", value: 1 }, {label:"选项2",value:2}] },
  { label: 'date日期:', path: 'remarks122', type: 'date', placeholder: '请输入备注', },
  { label: 'datetime日期加时间:', path: 'remarks26666', type: 'date', dateType: "datetime", itemwidth: '100%', placeholder: '请输入备注' },
  { label: 'daterange日期范围:', path: 'remarks2666688888',  type: 'date',dateType:"daterange",itemwidth: '100%', placeholder: '请输入备注' },
  { label: 'check多选复选框:', path: 'remarks2', type: 'check', placeholder: '请输入备注',options: [{ label: "选项1", value: 1 }, {label:"选项2",value:2}],itemwidth:"100%", },
  { label: 'radio单选按钮:', path: 'remarks4', type: 'radio',itemwidth:"100%", options: [{ label: "选项1", value: 1 }, {label:"选项2",value:2}],   },
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
const submit = () => { 
  console.log(queryFormData.value);
  
}
const dj = (state,change) => {
  // console.log(d);
  change()
 }


</script>

<style lang="scss" scoped></style>
