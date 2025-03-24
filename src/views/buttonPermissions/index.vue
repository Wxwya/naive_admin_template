<script lang="ts" setup>
import usePage from '@/hooks/usePage';
import UpModal from '@/components/PermissionsModal';
import Actions from './actions.vue';
import { closeModal } from '@/utils/comFunc';
class QueryForm { 
  permission_name: string = ''
  description: string = ''
}
const { proxy }: { proxy: CusProxy } = getCurrentInstance()
const { data, page, total, loading } = usePage() 
const { push } = useRouter()
const { query} = useRoute()
const queryFormData = ref(new QueryForm())
const rowIds = ref([])
const queryFormItem = computed(() => ([
  { label: '权限名称', path: 'permission_name', type: 'input', placeholder: '请输入权限名称' },
  { label: '权限描述', path: 'description', type: 'input', placeholder: '请输入权限描述', },
]))
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
const onSelect = (keys, rows) => {
  rowIds.value = keys
}
const initColumns = () => {
  return [
    {
      type: 'selection',
      fixed: 'left'
    },
    {
      title: '权限名称',
      key: 'permission_name'
    },
    {
      title: '权限描述',
      key: 'description'
    },


    {
      align: "center",
      title: "操作",
      key: "actions",
      render(row) {
        return h(Actions, { upData: () => initPermissions("修改菜单", row), delData: () => delPermissions(row.id), toSub: () => push(`/user/buttonPermissions?id=${row.permission_id}&prefix=${row.permission_name}`) })
      }
    }

  ]
}
const delPermissions = async (id) => {
  const m = window.$msg.loading('正在删除', { duration: 0 })
  const res = await proxy.$api.permissions.delPermissions( id ? [id] : rowIds.value )
  if (res.code === 200) { 
    getlist()
  }
  m.destroy()
}
const initPermissions = (title,row) => {
  const m = window.$modal.create({
    title,
    preset: 'card',
    style: {
      width:"600px"
    },
   content: () => h(UpModal, {close:()=>closeModal(m),row,getlist,parent_id:query.id, prefix:query.prefix})
  })
 }
const getlist = async () => { 
  loading.value = true
  const res = await proxy.$api.permissions.getPermissionsList({ ...queryFormData.value, ...page,parent_id:Number(query.id) })
  if (res.code === 200) { 
    data.value = res.data.list
    total.value = res.data.total
  }
  loading.value = false
}
onMounted(() => { 
  getlist()
})
defineOptions({
  name:"ButtonPermissions"
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
            <XwyaPopover text="新增">
          <XwyaButton v-has="'xwya:permission:add'"  @click="initPermissions('新增权限')" circle type="info" iconSize="20" icon="iconify gg--math-plus"  />
        </XwyaPopover>
         
        <XwyaPopover text="批量删除">
          <XwyaButton v-has="'xwya:permission:delete'" :disabled="rowIds.length?false:true" @click="delPermissions()" circle type="error" iconSize="20" icon="iconify solar--trash-bin-trash-bold"  />
        </XwyaPopover>
        </div>
      </template>
    </XwyaForm>
    <XwyaTabel :row-key="(r)=>r.permission_id" :columns="initColumns()" :data="data"  :onSelect="onSelect " :pagination="pagination" :loading="loading" />
  </div>
</template>

<style lang="scss" scoped></style>
