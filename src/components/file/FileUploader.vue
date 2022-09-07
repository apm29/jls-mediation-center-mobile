<template>
  <div>
    <input
      ref="inputRef"
      fixed="~"
      top="-100000px"
      type="file"
      multiple
      v-bind="$attrs"
      @input="handleFileInput(inputRef, $event)"
    />
    <div table="~" border="collapse" w="full" text="center sm">
      <div table="header-group" font="bold" text="gray-800" bg="gray-200" opacity="80">
        <div table="cell" border="~ gray-300">文件名</div>
        <div table="cell" border="~ gray-300">进度</div>
        <div table="cell" border="~ gray-300">操作</div>
      </div>
      <div table="row-group">
        <div table="row" v-for="file of fileList">
          <div table="cell" border="~ gray-300" overflow="x-auto">
            {{ file.name }}
          </div>
          <div table="cell" border="~ gray-300" w="120px">
            <el-progress
              v-if="file.status === StatusConst.UPLOADING"
              :percentage="file.progress"
            ></el-progress>
            <span
              v-if="file.status === StatusConst.FAILED"
              flex="~"
              items="center"
              justify="center"
            >
              上传失败
              <el-tooltip content="重试" placement="top">
                <i cursor="pointer" i-mdi-refresh text="red-500" @click="retry(file)" />
              </el-tooltip>
            </span>
            <span
              v-if="file.status === StatusConst.SUCCESS"
              flex="~"
              items="center"
              justify="center"
            >
              上传成功 <i i-mdi-check-circle text="green-500" />
            </span>
          </div>
          <div table="cell" border="~ gray-300" w="10">
            <el-button size="mini" type="text" @click="handleRemove(file)">
              删除
            </el-button>
          </div>
        </div>
      </div>
      <div table="row-group">
        <div table="row">
          <td colspan="3" table="cell" border="~ gray-300" p="3">
            <el-button @click="handleUpload(inputRef)" type="text" icon="el-icon-upload">
              上传附件
            </el-button>
          </td>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { remote } from "~/composables";
import axios from "axios";

const CancelToken = axios.CancelToken;

const props = defineProps({
  value: Array,
});

const emit = defineEmits(["input"]);

const inputRef = ref();

const fileList = ref([]);

function handleUpload(input) {
  input.click();
}

const StatusConst = {
  UPLOADING: 100,
  FAILED: 200,
  SUCCESS: 300,
};

function emitValue() {
  emit(
    "input",
    fileList.value.map((it) => it.url).filter((it) => it)
  );
}

function handleRemove(item) {
  const deleteIndex = fileList.value.indexOf(item);
  if (deleteIndex >= 0) {
    fileList.value.splice(deleteIndex, 1);
    if (item.cancelSource) {
      item.cancelSource.cancel("取消上传");
    }
    emitValue();
  }
}

function handleFileInput(input) {
  const files = Array.from(input.files);
  const uploadItems = files.map((file) => ({
    name: file.name,
    url: null,
    file,
    progress: 0,
    status: StatusConst.UPLOADING,
  }));
  fileList.value.push(...uploadItems);
  input.value = null;
  uploadItems.forEach((item) => {
    uploadItem(item);
  });
}

//重试fileList中的item
function retry(item) {
  uploadItem(item);
}

//上传fileList中的item
async function uploadItem(item) {
  item.status = StatusConst.UPLOADING;
  item.progress = 0;

  item.cancelSource = CancelToken.source();
  const formData = new FormData();
  formData.append("file", item.file, item.name);
  try {
    const res = await remote.postFile({
      url: "/java/upload/uploadFile",
      data: formData,
      onUploadProgress: function (progressEvent) {
        item.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      },
      cancelToken: item.cancelSource.token,
    });
    item.url = res.data;
    item.status = StatusConst.SUCCESS;
    emitValue();
  } catch (err) {
    console.log(err);
    item.status = StatusConst.FAILED;
  }
}
</script>

<style lang="scss" scoped></style>
