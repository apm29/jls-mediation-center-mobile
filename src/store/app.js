import { defineStore } from "pinia"
import { localToken, localInfo } from "~/composables";
export const useAppStore = defineStore("app", () => {
  const phone = ref(localInfo.value.phone)
  const name = ref(localInfo.value.name)
  const deptId = ref(localInfo.value.deptId)
  const token = ref(localToken)

  function setToken(tokenString) {
    token.value = tokenString
  }
  function setUserInfo(info) {
    name.value = info.name
    phone.value = info.phone
    deptId.value = info.deptId
    localInfo.value = info
  }

  const hasLogin = computed(() => {
    return !!token.value
  })

  function logout() {
    token.value = null
    localInfo.value = null
  }

  return {
    //state
    phone,
    name,
    deptId,
    token,
    //setter
    setToken,
    setUserInfo,
    logout,
    //getters
    hasLogin
  }
})
