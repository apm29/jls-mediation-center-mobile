<template>
  <el-select :value="value" @change="$emit('input', $event)">
    <el-option
      v-for="item in users"
      :key="item.userId"
      :label="item.userName"
      :value="item.userId"
    >
    </el-option>
  </el-select>
</template>

<script setup>
import { useUserDict } from "~/composables";
const props = defineProps({
  deptId: [String, Number],
  value: [String, Number],
});
const emit = defineEmits("input");
watch(
  () => props.deptId,
  () => {
    emit("input", null);
  }
);

const { users } = useUserDict(() => props.deptId);
</script>

<style lang="scss" scoped></style>
