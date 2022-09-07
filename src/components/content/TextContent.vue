<template>
  <div max-h="16" overflow="auto" scrollable="~">
    {{ value }}
  </div>
</template>

<script setup>
defineProps({
  value: String,
});
</script>

<style lang="scss" scoped></style>
