<script lang="ts" setup>
import { generatePermissions } from '@/api/permissions'; 
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
  permission_name:props.row.path?props.row.path: props.prefix
});

const loading = ref(false)
const formItemData = computed(() => ([
{ label: '权限名称', path: 'permission_name', type: 'input', placeholder: '请输入权限名称' },
  { label: '权限描述', path: 'description', type: 'input', placeholder: '请输入权限描述', },
]))

const rules: NaiveUI.FormRules = computed(() => {
  return formItemData.value.reduce((acc, cur, _) => {
    acc[cur.path] = [{ required: true, trigger: [],message:cur.placeholder}]
    return acc
  }, {})
})

const submit = async (validate: Function) => { 
  validate()(async (errors: any) => { 
    if (errors) return 
    loading.value = true
    if (props.parent_id) { 
      if (!formData.value.permission_name.includes(props.prefix)) { 
      window.$msg.error('前缀缺少' + props.prefix)
      loading.value=false
      return
    }
    if (formData.value.permission_name == props.prefix) { 
      window.$msg.error('请输入格式'+ props.prefix + ':xxx')
      loading.value=false
      return
    }
    }
    const res = await generatePermissions({...formData.value, parent_id: Number(props.parent_id)})
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
