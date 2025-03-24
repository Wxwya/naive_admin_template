<script lang="ts" setup>
import usePage from '@/hooks/usePage';
import Acruibs from "./actions.vue"
import UpModal from './upModal.vue';
import { closeModal} from "@/utils/comFunc"
import { NSwitch } from 'naive-ui';
class UserQueryForm {
  username= ""
  account= "";
  email= "";
  phone="";
  roles= void 0
  status=void 0
}
const { proxy }: { proxy: CusProxy } = getCurrentInstance()
const { data,total,loading,page} = usePage()
const rolesOption = ref()
const queryFormData = ref<UserQueryForm>({})
const rowIds = ref([])
const queryFormItem = computed(()=>[
  { label: '用户名', path: 'username', type: 'input', placeholder: '请输入用户名' },
  { label: '账号', path: 'account', type: 'input', placeholder: '请输入账号', },
  { label: "邮箱", path: "email", type: "input", placeholder: "请输入邮箱" },
  { label: "手机号", path: "phone", type: "input", placeholder: "请输入手机号" },
  {label:"角色",path:"roles",type:"select",placeholder:"请选择角色",options:rolesOption.value},
  { label: "状态", path: "status", type: "select", placeholder: "请选择状态", options: [
    {label:"启用",value:true},
    {label:"禁用",value:false},
  ]},
])
const pagination = computed(() => ({
    itemCount: total.value,
    pageSizes: [10, 20],
    pageSlot: 7,
    page: page.pageNum,
    "onUpdate:page": (p: number) => {
      page.pageNum = p
      getlist()
    }
  }))

const search = (state, change) => { 
  page.pageNum = 1
  if (state) { 
    queryFormData.value = new UserQueryForm()
  }
  getlist()
  change()
  
}
const getlist =  async() => { 
  loading.value = true
  const res = await proxy.$api.user.getUserList({ ...queryFormData.value, ...page })
  if (res.code === 200) { 
    data.value = res.data.userList
    total.value = res.data.total
  }
  loading.value=false
}
const initColumns = () => {
  return [
    {
      type: 'selection',
      fixed: 'left'
    },
    {
      title: '名称',
      key: 'username'
    },
    {
      title: '账号',
      key: 'account'
    },
    {
      title: '邮箱',
      key: 'email'
    },
    {
      title: '手机号',
      key: 'phone'
    },
    {
      title: '角色',
      key: 'role_info',
      render(row) {
        return h('div', {}, { default: () => row.role_info.join(',') })
      }
    },
    {
      title: "状态",
      key: "status",
      render(row,index) { 
        return h(NSwitch, { value: row.status, 'on-update:value': (val) => changeStatus(row.id,val,index) })
      }
    },
    {
      title: "创建时间",
      key:"create_time"
    },
    {
      align: "center",
      title: "操作",
      key: "actions",
      render(row) {
        return h(Acruibs, {upData:()=>initBusiness("修改用户",row),delData:()=>delBusiness(row.id) })
      }
    }
    // {
    //   title: 'Action',
    //   key: 'actions',
    //   render(row) {
    //     return h('div',
    //       {
    //         onClick: () => show(row)
    //       },
    //       { default: () => 'show' }
    //     )
    //   }
    // }
  ]
}
const initBusiness =  (title,row) => { 
 const m = window.$modal.create({
    title,
    preset: 'card',
    style: {
      width:"600px"
    },
   content: () => h(UpModal, {close:()=>closeModal(m),row,getlist,rolesOption:rolesOption.value})
  })
}
const onSelect = (keys, rows) => {
  rowIds.value = keys
}
const delBusiness = async (id) => {
  const m = window.$msg.loading('正在删除', { duration: 0 })
  const res = await proxy.$api.user.delUser( id ? [id] : rowIds.value )
  if (res.code === 200) { 
    getlist()
  }
  m.destroy()
}
const getRolesOption = async () => { 
  const res = await proxy.$api.role.getRoleOption()
  rolesOption.value=res.data
}
const changeStatus = async (id, status, index) => { 
  const res = await proxy.$api.user.changeUserStatus({ id, status: status })
  if (res.code === 200) { 
    getlist()
  }
  
}
onMounted(() => { 
  getRolesOption()
   getlist()
})
defineOptions({
  name:"BuSiness"
})

</script>

<template>
  <div class="p-4">
    <XwyaForm  label-placement="left" :item-list="queryFormItem" v-model="queryFormData" :row="5">
      <template #default="{ change, state,reset }">
        <n-button :type="!state ? 'primary' : 'error'" @click="search(state, change)">
             <span v-if="state" class="iconify ic--baseline-clear text-2xl"></span>
            <span v-else  class="iconify ic--baseline-manage-search text-2xl"></span>
        </n-button>
      </template>
      <template #button>
        <div class="flex gap-2">
            <XwyaPopover text="新增" >
          <XwyaButton v-has="'xwya:user:add'"  @click="initBusiness('新增用户')" circle type="info" iconSize="20" icon="iconify gg--math-plus"  />
        </XwyaPopover>
         
        <XwyaPopover text="批量删除">
          <XwyaButton v-has="'xwya:user:delete'" :disabled="rowIds.length?false:true" @click="delBusiness()" circle type="error" iconSize="20" icon="iconify solar--trash-bin-trash-bold"  />
        </XwyaPopover>
        </div>
      </template>
    </XwyaForm>
      <XwyaTabel :columns="initColumns()" :data="data"  :onSelect="onSelect " :pagination="pagination" :loading="loading" />
    
  </div>

</template>

<style lang="scss" scoped></style>
