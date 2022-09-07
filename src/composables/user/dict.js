import { getUsers } from "~/api/user";
export function useUserDict(getDeptId) {
  const loading = ref();
  const deptId = computed(getDeptId);
  const users = ref([]);

  function getUserDict() {
    loading.value = true;
    getUsers({
      deptId: deptId.value,
      pageNo: 1,
      pageSize: 9999,
    })
      .then((res) => {
        users.value = res.data.records || [];
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        loading.value = false;
      });
  }

  watch(deptId, getUserDict, { immediate: true })

  return {
    loading,
    users,
    getUserDict,
  };
}
