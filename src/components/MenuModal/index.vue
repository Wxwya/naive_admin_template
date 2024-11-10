<script lang="ts" setup>
import { generateMenu } from '@/api/menu';
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
  total: {
    type: Number,
    default: 0
  },
  parent_id: {
    type: [Number,String],
    default: 0
  },
  prefix: {
    type: String,
    default: ''
  }

})

const formData = ref({
  ...props.row,
  sort: props.row.sort != null ? props.row.sort.toString() : (props.total + 1).toString(),
  path: props.row.path?props.row.path: props.prefix
});

const loading = ref(false)
const formItemData = computed(() => ([
  { label: '目录名称', path: 'title', type: 'input', placeholder: '请输入角色名称' },
  { label: '目录图标', path: 'icon', type: 'input', placeholder: '请输入目录图标', },
  { label: '目录路径', path: 'path', type: 'input', placeholder: '请输入目录路径', },
  { label: '排序', path: 'sort', type: 'input', placeholder: '请输入目录排序' },
  { label: '是否显示', path: 'hidden', type: 'switch' },
]))

const rules: NaiveUI.FormRules = computed(() => {
  return formItemData.value.reduce((acc, cur, _) => {
    if(cur.path==='icon' || cur.path==='hidden') return acc
    acc[cur.path] = [{ required: true, trigger: [],message:cur.placeholder}]
    return acc
  }, {})
})

const submit = async (validate: Function) => { 
  validate()(async (errors: any) => { 
    if (errors) return 
    loading.value = true
    if (props.parent_id) { 
      if (!formData.value.path.includes(props.prefix)) { 
      window.$msg.error('路径前缀缺少' + props.prefix)
      loading.value=false
      return
    }
    if (formData.value.path == props.prefix) { 
      window.$msg.error('请输入二级路由路径')
      loading.value=false
      return
    }
    }
    const res = await generateMenu({...formData.value, sort: Number(formData.value.sort),parent_id: Number(props.parent_id)})
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
