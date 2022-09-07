import { defineStore } from "pinia"
import { localToken } from "~/composables";
export const useAppStore = defineStore("app", () => {
  const phone = ref()
  const name = ref()
  const token = ref(localToken)

  function setToken(tokenString) {
    token.value = tokenString
  }

  const hasLogin = computed(() => {
    return !!token.value
  })

  return {
    //state
    phone,
    name,
    token,
    //setter
    setToken,
    //getters
    hasLogin
  }
})
