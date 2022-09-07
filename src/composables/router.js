import { getCurrentInstance } from 'vue'
export function useRouter() {
  const { proxy } = getCurrentInstance()
  const router = proxy.$router
  return router
}

export const useRoute = () => {
  const { proxy } = getCurrentInstance()
  const route = proxy.$route
  return route
};
