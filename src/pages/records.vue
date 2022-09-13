<template>
  <div></div>
</template>

<script setup>
import { useRouter, useRoute } from "~/composables";
const router = useRouter();
const route = useRoute();
router.replace({
  path: "/app/records",
  query: route.query,
});
</script>

<style lang="scss" scoped></style>
