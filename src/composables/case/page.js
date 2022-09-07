import { getPagedCases } from "~/api/case";

export function useCasePaged() {
  const loading = ref()
  const total = ref(0)
  const pageNo = ref(1)
  const pageSize = ref(30)
  const cases = ref([])

  function onPagination({ refresh } = {}) {
    if (refresh) {
      pageNo.value = 1;
      total.value = 0;
    }
    loading.value = true;
    getPagedCases({
      pageNo: unref(pageNo),
      pageSize: unref(pageSize),
    }).then(res => {
      cases.value = res.data.records || []
      total.value = parseInt(res.data.total)
    }).catch(err => {
      console.error(err)
    }).finally(() => {
      loading.value = false;
    })
  }

  const search = useDebounceFn(() => onPagination({ refresh: true }), 600)
  return {
    loading,
    total,
    pageNo,
    pageSize,
    cases,
    onPagination,
    search
  }

}
