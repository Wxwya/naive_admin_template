<script lang="ts" setup>
import { generateRole,getRoleInfo as getRoleInfoApi } from "@/api/role";
import { getMenuOption as getMenuOptionApi } from "@/api/menu";
import { getPermissionsOptions } from "@/api/permissions";
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
  }

})

const formData = ref({ ...props.row })
const menuOption = ref([])
const permissionsOption = ref([])
const loading = ref(false)
const formItemData = computed(() => ([
{ label: '角色名称', path: 'role_name', type: 'input', placeholder: '请输入用户名' },
  { label: '角色描述', path: 'description', type: 'input', placeholder: '请输入账号', },
  {label:"菜单配置",path:"menu_ids",type:"tree",labelField:"title",multiple:true,checkable:true, keyField:"value", placeholder:"请选择菜单",options:menuOption.value},
  {label:"权限配置",path:"permissions_ids",type:"tree",labelField:"title",multiple:true,checkable:true, keyField:"value", placeholder:"请选择权限",options:permissionsOption.value},
]))
const rules: NaiveUI.FormRules = computed(() => {
  return formItemData.value.reduce((acc, cur, _) => {
    if (cur.path === 'menu_ids' || cur.path === 'permissions_ids') return acc 
    acc[cur.path] = [{ required: true, trigger: [],message:cur.placeholder }]
    return acc
  }, {})
})
const submit = async (validate: Function) => { 
  validate()(async (errors: any) => { 
    if (errors) return 
    loading.value = true
  const res = await generateRole(formData.value)
  if (res.code === 200) { 
    props.getlist()
    props.close()
  }
  loading.value=false
  })
}
const getRoleInfo = async () => { 
  const res = await getRoleInfoApi(props.row.role_id)
  if (res.code === 200) { 
    formData.value = res.data
  }
  
}
const getMenuOption = async () => {
  const res = await getMenuOptionApi()
  menuOption.value = res.data
 }
const getPermissionsOption = async () => { 
  const res = await getPermissionsOptions()
  permissionsOption.value = res.data
}
onMounted(() => {
  props.row.role_id&& getRoleInfo()
  getMenuOption()
  getPermissionsOption()
})
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
