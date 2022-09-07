<template>
  <el-cascader
    label="name"
    :value="value"
    :options="options"
    @change="$emit('input', $event)"
    :props="{
      emitPath: false,
      checkStrictly: true,
    }"
  >
  </el-cascader>
</template>

<script setup>
const props = defineProps({
  dict: Array,
  value: [String, Number],
});
const options = computed(() => props.dict.map(convertDept));

function convertDept(dept) {
  return {
    ...dept,
    label: dept.name,
    value: dept.deptId,
    children:
      dept.children && dept.children.length ? dept.children.map(convertDept) : null,
  };
}
</script>

<style lang="scss" scoped></style>
