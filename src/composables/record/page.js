import { getPagedRecords } from "~/api/record";

export function useRecordPaged(getPersonId) {
  const personId = computed(getPersonId)
  const loading = ref();
  const total = ref(0);
  const pageNo = ref(1);
  const pageSize = ref(30);
  const records = ref([]);

  function onPagination({ refresh } = {}) {
    if (refresh) {
      pageNo.value = 1;
      total.value = 0;
      records.value = []
    }
    if (total.value !== 0 && total.value <= records.value.length) {
      return Promise.resolve()
    }
    loading.value = true;
    return getPagedRecords({
      pageNo: unref(pageNo),
      pageSize: unref(pageSize),
      personId: unref(personId),
    })
      .then((res) => {
        records.value = [...records.value, ...(res.data.records || [])];;
        total.value = parseInt(res.data.total);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        loading.value = false;
      });
  }

  const search = useDebounceFn(() => onPagination({ refresh: true }), 600);

  watch(personId, search)
  return {
    loading,
    total,
    pageNo,
    pageSize,
    records,
    onPagination,
    search,
  };
}
