<script lang="ts" setup>
// import { generateUser, getUserInfo } from "@/api/user"
import { generateDict } from '@/api/dict';
const props = defineProps({
  close: {
    type: Function,
    default: () => { }
  },
  getlist: {
    type: Function,
    default: () => { }
  },
  row: {
    type: Object,
    default: {}
  },
  userInfo: {
    type: Object,
    default: () => { }
  },
  dict_type_id: {
    type: String,
    default: ''
  }
})

const formData = ref({
  ...props.row,
  order_num: props.row.order_num ? props.row.order_num.toString() : '',
  username:props.row.username? props.row.username:props.userInfo.username,
})
const loading = ref(false)
const formItemData = computed(() => ([
{ label: '字典键', path: 'dict_label', type: 'input', placeholder: '请输入字典键' },
  { label: '字典值', path: 'dict_value', type: 'input', placeholder: '请输入字典值' },
  { label: "排序", path: "order_num", type: "input", placeholder: "请输入排序", },
]))
const rules: NaiveUI.FormRules = computed(() => {
  return formItemData.value.reduce((acc, cur, _) => {
    if(cur.path==='is_default' ) return acc 
    acc[cur.path] = [{ required: true, trigger: [],message:cur.placeholder,type:cur.ruleType }]
    return acc
  }, {})
})
const submit = async (validate: Function) => { 
  validate()(async (errors: any) => { 
    if (errors) return 
    loading.value = true
    const res = await generateDict({dict_type_id:Number(props.dict_type_id),...formData.value,order_num:Number(formData.value.order_num)})
  if (res.code === 200) { 
    props.getlist()
    props.close()
  }
  loading.value=false
  })
}

</script>

<template>
  <div class="">
    <XwyaForm  :rules="rules" label-placement="left" :label-width="80" :item-list="formItemData" v-model="formData" >
      <template #default="{validate}">
        <div class="w-full flex gap-4 justify-end pr-[10px]">
      <XwyaButton  @click="submit(validate)" type="success" text="确认" :loading="loading" />
      <XwyaButton  @click="props.close" text="取消" />
    </div>
      </template>
    </XwyaForm>
  
  </div>


</template>

<style lang="scss" scoped></style>
