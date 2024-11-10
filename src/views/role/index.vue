<script lang="ts" setup>
import usePage from '@/hooks/usePage';
import Acruibs from "./actions.vue"
import UpModal from "./upModal.vue"
import { closeModal } from '@/utils/comFunc';
class QueryForm { 
  role_name: string = ''
  description: string = ''
}
const { proxy }: { proxy: CusProxy } = getCurrentInstance()
const { data,page,total,loading} = usePage() 
const queryFormData = ref(new QueryForm())
const rowIds = ref([])
const queryFormItem = computed(() => ([
{ label: '角色名称', path: 'role_name', type: 'input', placeholder: '请输入角色名称' },
  { label: '角色描述', path: 'description', type: 'input', placeholder: '请输入描述', },]
))
const onSelect = (keys, rows) => {
  rowIds.value = keys
}
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
const getlist = async () => { 
  loading.value=true
  const res = await proxy.$api.role.getRoleList({ ...queryFormData.value, ...page })
  if (res.code === 200) { 
    data.value = res.data.list
    total.value = res.data.total
  }
  loading.value=false
}
const search = (state, change) => { 
  page.pageNum = 1
  if (state) { 
    queryFormData.value = new QueryForm()
  }
  getlist()
  change()
}
const delRole = async (id) => {
  const m = window.$msg.loading('正在删除', { duration: 0 })
  const res = await proxy.$api.role.delRole({ ids: id ? [id] : rowIds.value })
  if (res.code === 200) { 
    getlist()
  }
  m.destroy()
}
const initRole = (title, row) => { 
  const m = window.$modal.create({
    title,
    preset: 'card',
    style: {
      width:"600px"
    },
   content: () => h(UpModal, {close:()=>closeModal(m),row,getlist})
  })
}
const initColumns = () => {
  return [
    {
      type: 'selection',
      fixed: 'left'
    },
    {
      title: '角色名称',
      key: 'role_name'
    },
    {
      title: '描述',
      key: 'description'
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
        return h(Acruibs, {upData:()=>initRole("修改角色",row),delData:()=>delRole(row.role_id) })
      }
    }

  ]
}
onMounted(() => { 
  getlist()
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
          <XwyaButton v-has="'xwya:role:add'"  @click="initRole('新增角色')" circle type="info" iconSize="20" icon="iconify gg--math-plus"  />
        </XwyaPopover>
         
        <XwyaPopover text="批量删除">
          <XwyaButton v-has="'xwya:role:delete'"  :disabled="rowIds.length?false:true" @click="delRole()" circle type="error" iconSize="20" icon="iconify solar--trash-bin-trash-bold"  />
        </XwyaPopover>
        </div>
      </template>
    </XwyaForm>
    <XwyaTabel :row-key="(r)=>r.role_id" :columns="initColumns()" :data="data"  :onSelect="onSelect " :pagination="pagination" :loading="loading" />
  </div>
</template>

<style lang="scss" scoped></style>
