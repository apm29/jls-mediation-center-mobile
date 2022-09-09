<script setup>
import AccountSwitch from "~/components/user/AccountSwitch.vue";
</script>

<template>
  <div h="full">
    <div relative w-full flex flex-col>
      <img
        src="/dashboard.svg"
        alt="banner"
        w="full"
        h="50vw"
        p="t-2"
        class="w-3/5 rounded-lg self-end"
      />
      <h1 class="float-title">矛盾化解平台</h1>
    </div>
    <div grid="~ cols-4" justify="start" items="start" p="3" class="app-grid">
      <router-link to="/app/persons" flex="~ col" justify="center" items="center" gap="2">
        <i i-carbon-group-security text="3xl green-600"></i>
        <h2 text="xs">矛盾化解人员</h2>
      </router-link>
      <!-- <router-link to="/app/records" flex="~ col" justify="center" items="center" gap="2">
        <i i-carbon-chat text="3xl orange-600"></i>
        <h2 text="xs">消息管理</h2>
      </router-link> -->
      <AccountSwitch> </AccountSwitch>
    </div>
  </div>
</template>

<style scoped>
.app-grid > * {
  @apply px-1 py-2;
}
.float-title {
  @apply absolute bottom-4 text-2xl font-bold left-4;
}
</style>
