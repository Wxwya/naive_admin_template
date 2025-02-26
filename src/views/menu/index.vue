<script lang="ts" setup>
import usePage from '@/hooks/usePage';
import UpModal from "@/components/MenuModal";
import Actions from './actions.vue';
import { closeModal } from '@/utils/comFunc';
import { NSwitch } from 'naive-ui';
class QueryForm { 
  title: string = ''
  path: string = ''
  status= void 0
}
const { proxy }: { proxy: CusProxy } = getCurrentInstance()
const { data, page, total, loading } = usePage() 
const { push} = useRouter()
const queryFormData = ref(new QueryForm())
const rowIds = ref([])
const queryFormItem = computed(() => ([
  { label: '目录名称', path: 'title', type: 'input', placeholder: '请输入路径名' },
  { label: '目录路径', path: 'path', type: 'input', placeholder: '请输入目录路径', },
  { label: "状态", path: "status", type: "select", placeholder: "请选择状态", options: [{ label: "启用", value: true }, { label: "禁用", value: false }] }
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
      title: '目录名称',
      key: 'title'
    },
    {
      title: '目录图标',
      key: 'icon'
    },
    {
      title: '目录路径',
      key: 'path'
    },
    {
      title: "状态",
      key: "status",
      render(row,index) { 
        return h(NSwitch, { value: row.status, 'on-update:value': (val) => changeStatus(row.id,val,index) })
      }
    },
    {
      align: "center",
      title: "操作",
      key: "actions",
      render(row) {
        return h(Actions, { upData: () => initMenu("修改菜单", row), delData: () => delMenu(row.id), toSub: () => push(`/user/subMenu?id=${row.id}&prefix=${row.path}`) })
      }
    }

  ]
}
const search = (state, change) => { 
  page.pageNum = 1
  if (state) { 
    queryFormData.value = new QueryForm()
  }
  getlist()
  change()
}
const initMenu = (title,row) => { 
  const m = window.$modal.create({
    title,
    preset: 'card',
    style: {
      width:"600px"
    },
   content: () => h(UpModal, {close:()=>closeModal(m),row,getlist,total:total.value})
  })
}
const delMenu = async (id) => {
  const m = window.$msg.loading('正在删除', { duration: 0 })
  const res = await proxy.$api.menu.delMenu({ ids: id ? [id] : rowIds.value })
  if (res.code === 200) { 
    getlist()
  }
  m.destroy()
}
const getlist = async () => { 
  loading.value = true
  const res = await proxy.$api.menu.getMenuList({ ...queryFormData.value, ...page })
  if (res.code === 200) { 
    data.value = res.data.list
    total.value = res.data.total
  }
  loading.value = false
}
const changeStatus = async (id, val, index) => {
  const res = await proxy.$api.menu.changeMenuStatus({ id, status: val })
  if (res.code === 200) { 
    data.value[index].status = val
  }
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
          <XwyaButton v-has="'xwya:menu:add'"  @click="initMenu('新增菜单')" circle type="info" iconSize="20" icon="iconify gg--math-plus"  />
        </XwyaPopover>
         
        <XwyaPopover text="批量删除">
          <XwyaButton v-has="'xwya:menu:delete'" :disabled="rowIds.length?false:true" @click="delMenu()" circle type="error" iconSize="20" icon="iconify solar--trash-bin-trash-bold"  />
        </XwyaPopover>
        </div>
      </template>
    </XwyaForm>
    <XwyaTabel :columns="initColumns()" :data="data"  :onSelect="onSelect " :pagination="pagination" :loading="loading" />
  </div>
</template>

<style lang="scss" scoped></style>
