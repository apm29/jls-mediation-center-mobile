<template>
  <el-form
    ref="formRef"
    :model="form"
    size="medium"
    label-position="top"
    label-width="15rem"
    :rules="rules"
    grid="~ cols-4"
    gap="2"
  >
    <PropForm label="姓名" prop="name"></PropForm>
    <PropForm label="身份证" prop="idNo"></PropForm>
    <PropForm label="民族" prop="mz"></PropForm>
    <PropForm label="性别" prop="sex" :selection="GenderSelection"></PropForm>
    <PropForm col="span-2" label="入所原因" prop="reason"></PropForm>
    <PropForm col="span-2" label="违法犯罪性质" prop="wffzxz"></PropForm>
    <PropForm label="办案单位" prop="baUnit"></PropForm>
    <PropForm label="拘留天数" prop="detentionDays" number></PropForm>
    <PropForm label="入所日期" prop="startDate" date="date"></PropForm>
    <PropForm label="拘留结束日期" prop="endDate" date="date"></PropForm>
    <!-- <PropForm col="span-2" label="矛盾化解工作情况" prop="mdhjgzqk" textarea></PropForm>
    <PropForm col="span-2" label="矛盾化解结果" prop="mdhjjg" textarea></PropForm>
    <el-form-item col="span-full" label="关联案件信息" prop="ajxx">
      <CaseSelector v-model="form.ajxx"> </CaseSelector>
    </el-form-item> -->
    <div h="50vh"></div>

    <el-form-item col="span-full" sticky="~" bottom="2" z="30" block="~" w="full">
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
import CaseSelector from "~/components/case/CaseSelector.vue";
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

const GenderSelection = [
  {
    value: 1,
    label: "男",
  },
  {
    value: 2,
    label: "女",
  },
];

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
