<template>
  <div border="~" rounded="~" p="x-2 t-2" divide="y-1">
    <div text="gray-400" flex="~" gap="x-3">
      已选择{{ fileNoWrapper.length }}条
      <el-button
        type="text"
        @click="
          handleClear();
          $forceUpdate();
        "
      >
        清空
      </el-button>
    </div>
    <div
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      flex="grow"
      min-h="16"
    >
      <div v-for="item of cases">
        <div text="gray-500">
          <el-checkbox
            :label="`文书号：${item.fileNo}`"
            :value="fileNoWrapper.includes(item.fileNo)"
            @input="
              handleSelect($event, item.fileNo);
              $forceUpdate();
            "
          ></el-checkbox>
        </div>
      </div>
    </div>
    <el-pagination
      size="mini"
      :current-page.sync="pageNo"
      :page-sizes="[30, 50, 100, 500]"
      :page-size.sync="pageSize"
      layout="total, prev, pager, next"
      :total="total"
      @size-change="onPagination"
      @current-change="onPagination"
    >
    </el-pagination>
  </div>
</template>

<script setup>
import { useCasePaged } from "~/composables";

const props = defineProps({
  value: String,
});
const emits = defineEmits(["input"]);

//文书号
const fileNoWrapper = computed({
  get: () => {
    return (props.value || "").split(",").filter((it) => it);
  },
  set: (val) => {
    const value = (val || []).join(",");
    emits("input", value);
  },
});

function handleClear() {
  fileNoWrapper.value = [];
}

function handleSelect(select, fileNo) {
  const fileNoList = unref(fileNoWrapper);
  if (select && !fileNoList.includes(fileNo)) {
    fileNoList.push(fileNo);
  } else if (!select && fileNoList.includes(fileNo)) {
    const deleteIndex = fileNoList.indexOf(fileNo);
    if (deleteIndex >= 0) {
      fileNoList.splice(deleteIndex, 1);
    }
  }
  const value = fileNoList.join(",");
  emits("input", value);
}

//分页
const { loading, total, pageNo, pageSize, cases, onPagination, search } = useCasePaged();
onMounted(onPagination);
</script>

<style lang="scss" scoped></style>
