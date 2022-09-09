import { defineStore } from "pinia"
import { localToken, localInfo } from "~/composables";
export const useAppStore = defineStore("app", () => {
  const phone = ref(localInfo.value.phone)
  const name = ref(localInfo.value.name)
  const deptIds = ref(localInfo.value.deptIds)
  const token = ref(localToken)

  function setToken(tokenString) {
    token.value = tokenString
  }

  function setUserInfo(info) {
    name.value = info.name
    phone.value = info.phone
    deptIds.value = info.deptIds
    localInfo.value = info
  }

  const hasLogin = computed(() => {
    return !!token.value && !!deptIds.value && !!name.value;
  });

  function logout() {
    token.value = null
    localInfo.value = null
  }

  return {
    //state
    phone,
    name,
    deptIds,
    token,
    //setter
    setToken,
    setUserInfo,
    logout,
    //getters
    hasLogin
  }
})
