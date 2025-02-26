<script lang="ts" setup>
import usePage from '@/hooks/usePage';
import Acruibs from "./actions.vue"
import UpModal from './upModal.vue';
import { NInput } from 'naive-ui';
import { closeModal } from '@/utils/comFunc';
import useSystemStore from '@/store/useSystemStore';
import { render } from 'vue';
class QueryForm { 
  type_name: string = ''
  username: string = ''
}
const { proxy }: { proxy: CusProxy } = getCurrentInstance()
const { data, page, total, loading } = usePage() 
const { userInfo} = useSystemStore()
const { push} = useRouter()
const queryFormData = ref(new QueryForm())
const rowIds = ref([])

const queryFormItem = computed(() => ([
{ label: '字典类型', path: 'type_name', type: 'input', placeholder: '请输入字典类型' },
  { label: '创建者', path: 'username', type: 'input', placeholder: '请输入创建者', },]
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
  const res = await proxy.$api.dict.getDictTypeList({ ...queryFormData.value, ...page })
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
const delDictType = async (id) => {
  const m = window.$msg.loading('正在删除', { duration: 0 })
  const res = await proxy.$api.dict.delDictType({ ids: id ? [id] : rowIds.value })
  if (res.code === 200) { 
    getlist()
  }
  m.destroy()
}
const initDictType = (title, row) => { 
  const m = window.$modal.create({
    title,
    preset: 'card',
    style: {
      width:"600px"
    },
   content: () => h(UpModal, {close:()=>closeModal(m),row,getlist,userInfo})
  })
}

const initColumns = () => {
  return [
    {
      type: 'selection',
      fixed: 'left'
    },
    {
      title: '字典名称',
      key: 'dict_name'
    },
    {
      title: '字典类型',
      key: 'type_name'
    },
    {
      title: "是否系统默认",
      key: "is_default",
      render(row) { 
        return row.is_default ==='Y'? '是' : '否'
      }
    },
    {
      title: '创建者',
      key: 'username'
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
        return h(Acruibs, { upData: () => initDictType("修改字典类型", row), delData: () => delDictType(row.id), toSub: () => push(`/system/subDict?id=${row.id}`)  })
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
          <XwyaButton v-has="'xwya:dict:add'"  @click="initDictType('新增字典类型')" circle type="info" iconSize="20" icon="iconify gg--math-plus"  />
        </XwyaPopover>
         
        <XwyaPopover text="批量删除">
          <XwyaButton v-has="'xwya:dict:delete'" :disabled="rowIds.length?false:true" @click="delDictType()" circle type="error" iconSize="20" icon="iconify solar--trash-bin-trash-bold"  />
        </XwyaPopover>
        </div>
      </template>
    </XwyaForm>
    <XwyaTabel :columns="initColumns()" :data="data"  :onSelect="onSelect " :pagination="pagination" :loading="loading" />
  </div>
</template>

<style lang="scss" scoped></style>
