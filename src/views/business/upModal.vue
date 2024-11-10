<script lang="ts" setup>
import {generateUser,getUserInfo} from "@/api/user"
const props = defineProps({
  rolesOption: {
    type: Array,
    default: () => [],
  },
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
  }

})

const formData = ref({...props.row})
const loading = ref(false)
const formItemData = computed(() => ([
{ label: '用户名', path: 'username', type: 'input', placeholder: '请输入用户名',ruleType:"string" },
  { label: '账号', path: 'account', type: 'input', placeholder: '请输入账号',ruleType:"string" },
  { label: "邮箱", path: "email", type: "input", placeholder: "请输入邮箱",ruleType:"string" },
  { label: "手机号", path: "phone", type: "input", placeholder: "请输入手机号",ruleType:"string" },
  {label:"密码",path:"password",type:"input",placeholder:"请输入密码",ruleType:"string"},
  {label:"角色",path:"role_ids",type:"select",filterable:true,multiple:true, placeholder:"请选择角色",options:props.rolesOption,ruleType:"array"},
]))
const rules: NaiveUI.FormRules = computed(() => {
  return formItemData.value.reduce((acc, cur, _) => {
    if(cur.path==='password' && props.row.id) return acc 
    acc[cur.path] = [{ required: true, trigger: [],message:cur.placeholder,type:cur.ruleType }]
    return acc
  }, {})
})
const submit = async (validate: Function) => { 
  validate()(async (errors: any) => { 
    if (errors) return 
    loading.value = true
  const res = await generateUser(formData.value)
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
