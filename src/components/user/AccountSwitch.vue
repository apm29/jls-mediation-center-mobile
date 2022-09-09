<template>
  <div
    fixed="~"
    right="6"
    bottom="3"
    bg="red-500"
    text="white sm"
    rounded="full"
    @click="changeAccount()"
  >
    <div flex="~" items="center" p="x-3">
      {{ store.name }} 切换账号
      <i i-carbon-arrows-horizontal></i>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "~/store/app";
import { useRouter } from "~/composables";
const store = useAppStore();
const router = useRouter();
function changeAccount() {
  const confirm = window.confirm("退出当前账号吗?");
  if (confirm) {
    store.logout();
    router.replace("/login");
  }
}
</script>

<style lang="scss" scoped></style>
