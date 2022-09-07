<template>
  <div p="y-2" flex="~" gap="2">
    <a
      text="underline blue-500"
      v-for="(attachment, index) of attachments"
      :href="`${baseUrl}${attachment}`"
      target="_blank"
    >
      附件{{ index + 1 }}
    </a>
    <p v-if="!attachments || !attachments.length">无附件</p>
  </div>
</template>

<script setup>
const props = defineProps({
  files: String,
});
const { files } = toRefs(props);
const attachments = computed(() => {
  return files.value ? files.value.split(",") : [];
});
const baseUrl =
  import.meta.env.MODE === "development"
    ? "http://mdhjtest.ciih.net/"
    : `${window.location.protocol}//${window.location.hostname}/`;
</script>

<style lang="scss" scoped></style>
