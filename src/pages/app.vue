<template>
  <div h="full">
    <router-view h="full" w="full" overflow="hidden"></router-view>
    <AccountSwitch></AccountSwitch>
  </div>
</template>
<script setup>
import AccountSwitch from "~/components/user/AccountSwitch.vue";
</script>
