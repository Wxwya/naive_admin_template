<script lang="ts" setup>
// import { generateUser, getUserInfo } from "@/api/user"
import { generateDictType } from '@/api/dict';
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

})

const formData = ref({
  ...props.row,
  username:props.row.username? props.row.username:props.userInfo.username,
})
const loading = ref(false)
const formItemData = computed(() => ([
{ label: '字典名称', path: 'dict_name', type: 'input', placeholder: '请输入字典名称' },
  { label: '字典类型', path: 'type_name', type: 'input', placeholder: '请输入字典类型' },
  { label: "是否系统配置", path: "is_default", type: "select", placeholder: "请选择是否系统配置", options: [{ label: "是", value: "Y" }, {label:"否",value:"N"}],ruleType:"array",isShow:props.userInfo.account==='admin'},
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
    const res = await generateDictType({...formData.value})
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
