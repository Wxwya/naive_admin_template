/***
 * 
 * @param pageSize  条数
 * 
 * @returns {page: {pageSize, pageNum}, total: number,loading: boolean}
 */
const usePage = (pageSize: number=10) => { 
  const page = reactive({
    pageSize,
    pageNum: 1,
  })
  const total:number = ref(0)
  const loading = ref(false)
  return {
    page,
    total,
    loading
  }
}
export default usePage