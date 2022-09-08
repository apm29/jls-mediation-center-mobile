<template>
  <el-form
    ref="formRef"
    :model="form"
    size="medium"
    label-position="right"
    label-width="5rem"
    :rules="rules"
  >
    <PropForm label="文书号" prop="fileNo"></PropForm>
    <PropForm label="基本信息" prop="jbxx" textarea></PropForm>
    <PropForm label="具体内容" prop="jtnr" textarea></PropForm>
    <PropForm label="违法性质" prop="wfxz"></PropForm>
    <PropForm label="执行状态" prop="zxzt" :selection="ExecuteSelection"></PropForm>
    <el-form-item label="附件">
      <FileUploader v-model="form.attatchments"></FileUploader>
    </el-form-item>
    <el-button
      sticky="~"
      bottom="2"
      z="30"
      size="medium"
      v-loading="saving"
      type="primary"
      @click="handleSave(formRef)"
      block="~"
      w="full"
    >
      保存
    </el-button>
  </el-form>
</template>

<script setup>
import PropForm from "~/components/content/PropForm.vue";
import FileUploader from "~/components/file/FileUploader.vue";
const props = defineProps({
  form: Object,
  saving: Boolean,
  save: Function,
});

const ExecuteSelection = [
  {
    value: 1,
    label: "已执行",
  },
  {
    value: 0,
    label: "未执行",
  },
];

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
</script>

<style lang="scss" scoped></style>
