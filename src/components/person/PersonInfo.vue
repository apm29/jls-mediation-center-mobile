<template>
  <div table="~" max-w="full">
    <div table="header-group">
      <div table="row">
        <div table="cell" class="header">姓名</div>
        <div table="cell">{{ person.name }}</div>
      </div>
      <div table="row">
        <div table="cell" class="header">身份证</div>
        <td table="cell">{{ person.idNo }}</td>
      </div>
      <div table="row">
        <div table="cell" class="header">民族</div>
        <div table="cell">{{ person.mz }}</div>
        <div table="cell" class="header">性别</div>
        <div table="cell">{{ Gender[person.sex] }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ExecutionStatus, Gender } from "~/helpers/enum.js";
defineProps({
  person: Object,
});
</script>

<style lang="scss" scoped>
div[table="cell"],
td[table="cell"] {
  @apply p-1 text-left text-xs;
}
.header {
  @apply font-bold text-xs;
  vertical-align: top;
}
</style>
