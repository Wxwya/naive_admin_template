<script lang="ts" setup>
import usePage from '@/hooks/usePage';
const { proxy }: {proxy:CusProxy} = getCurrentInstance()
const { data, total, loading, page } = usePage();
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
const initColumns = () => {
  return [
    {
      title: '序号',
      key: 'id'
    },
    {
      title: '状态码',
      key: 'status_code'
    },
    {
      title: 'ip地址',
      key: 'ip'
    },
    {
      title: '请求方法',
      key: 'method'
    },
    {
      width: 200,
      ellipsis: {
        tooltip: true
      },
      ellipsisComponent:"ellipsis",
      title: '请求地址',
      key: 'path',
    },
    {
      width: 500,
      ellipsis: {
        tooltip: true
      },
      ellipsisComponent:"ellipsis",
      title: "错误信息",
      key:"error_content",
    },
    {
      width: 200,
      ellipsis: {
        tooltip: true
      },
      ellipsisComponent:"ellipsis",
      title: "错误文件",
      key:"file",
    },
    {
      title: "错误行",
      key:"line",
    },
    {
      width: 160,
      title: "发生时间",
      key:"create_time",
    }
  ]
}
const getlist = async () => {
  loading.value = true;
  const res = await proxy.$api.system.getLogList(page)
  if (res.code === 200) {
    data.value = res.data.list
    total.value= res.data.total
  }
  loading.value = false;
}
onMounted(() => {
  getlist()
})
</script>

<template>
  <div class="p-4">
    <XwyaTabel   :columns="initColumns()" :data="data"   :pagination="pagination " :loading="loading" />

  </div>
</template>

<style lang="scss" scoped></style>
