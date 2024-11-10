/***
 * 
 * @param pageSize  条数
 * 
 * @returns {page: {pageSize, pageNum}, total: number,loading: boolean,data:[]any}
 */
const usePage = (pageSize: number=10) => { 
  const page = reactive({
    pageSize,
    pageNum: 1,
  })
  const data = ref([])
  const total:number = ref(0)
  const loading = ref(false)
  
  return {
    page,
    total,
    loading,
    data
  }
}
export default usePage