import { getDept } from "~/api/dept";
export function useDeptDict() {
  const loading = ref()
  const depts = ref([])

  function getDeptDict() {
    loading.value = true;
    getDept().then(res => {
      depts.value = res.data || []
    }).catch(err => {
      console.error(err)
    }).finally(() => {
      loading.value = false;
    })
  }

  return {
    loading,
    depts,
    getDeptDict,
  }

}
