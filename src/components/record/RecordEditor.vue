<template>
  <el-form
    ref="formRef"
    :model="form"
    size="mini"
    label-position="right"
    label-width="4rem"
    :rules="rules"
  >
    <PropForm label="内容" prop="content" textarea></PropForm>
    <el-form-item label="接收人">
      <DeptSelector :dict="depts" v-model="form.acceptDeptId" m="r-2"></DeptSelector>
      <DeptUserSelector
        :deptId="form.acceptDeptId"
        v-model="form.acceptUserId"
      ></DeptUserSelector>
    </el-form-item>
    <el-form-item label="附件">
      <FileUploader v-model="form.attatchments"></FileUploader>
    </el-form-item>
    <el-form-item sticky="~" bottom="2" z="30">
      <el-button
        v-loading="saving"
        type="primary"
        @click="handleSave(formRef)"
        block="~"
        w="full"
      >
        保存
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import PropForm from "~/components/content/PropForm.vue";
import FileUploader from "~/components/file/FileUploader.vue";
import { useDeptDict } from "~/composables";
import DeptSelector from "~/components/dept/DeptSelector.vue";
import DeptUserSelector from "~/components/user/DeptUserSelector.vue";
const props = defineProps({
  form: Object,
  saving: Boolean,
  save: Function,
});

const rules = {};
provide("form", props.form);
provide("rules", rules);

const formRef = ref();
onMounted(() => {
  unref(formRef).clearValidate();
});
const emits = defineEmits(["saved"]);
function handleSave(formRef) {
  formRef
    .validate()
    .then(() => {
      return props?.save?.();
    })
    .then(() => {
      emits("saved");
    })
    .catch((err) => {
      console.error(err);
    });
}

const { depts, getDeptDict } = useDeptDict();
onMounted(getDeptDict);
</script>

<style lang="scss" scoped></style>
