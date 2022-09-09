import { getPagedPersons } from "~/api/person";

export function usePersonPaged() {
  const loading = ref();
  const searchName = ref();
  const searchIdNo = ref();
  const total = ref(0);
  const pageNo = ref(1);
  const pageSize = ref(30);
  const persons = ref([]);

  function onPagination({ refresh } = {}) {
    if (refresh) {
      pageNo.value = 1;
      total.value = 0;
      persons.value = []
    }
    if (total.value !== 0 && total.value <= persons.value.length) {
      return Promise.resolve()
    }
    loading.value = true;
    return getPagedPersons({
      pageNo: unref(pageNo),
      pageSize: unref(pageSize),
      name: unref(searchName),
      idNo: unref(searchIdNo),
    })
      .then((res) => {
        persons.value = [...persons.value, ...(res.data.records || [])];
        total.value = parseInt(res.data.total);
        pageNo.value += 1
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        loading.value = false;
      });
  }

  const search = useDebounceFn(() => onPagination({ refresh: true }), 600);
  return {
    loading,
    searchName,
    searchIdNo,
    total,
    pageNo,
    pageSize,
    persons,
    onPagination,
    search,
  };
}
