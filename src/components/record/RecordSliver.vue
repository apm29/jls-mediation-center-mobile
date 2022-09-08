<template>
  <div class="record-sliver" text="sm" bg="white">
    <div class="sender-receiver" text="gray-400" p="x-2 y-1">
      <el-tag size="mini" type="info">
        {{ record.sendDeptName }} {{ record.sendUserName }}
      </el-tag>

      <span text="xs"> {{ record.parentId ? "回复" : "发送给" }} </span>

      <el-tag size="mini" type="info">
        {{ record.acceptDeptName }} {{ record.acceptUserName }}
      </el-tag>
    </div>
    <div class="sender-receiver" text="gray-400 xs" p="x-2 y-1">
      {{ dayjs(record.createTime).format("YYYY/MM/DD HH:mm") }}
    </div>
    <div class="content" p="x-2 t-1 b-3">
      {{ record.content }}
    </div>
    <Attachments hide-on-empty p="x-2" :files="record.file"></Attachments>
    <div class="action-bar" flex="~" justify="end" p="x-3">
      <el-button
        size="small"
        type="text"
        icon="el-icon-chat-line-round"
        @click="$emit('reply', record)"
      >
        回复
      </el-button>
    </div>
    <div
      border="1 gray-200 l-4 l-gray-300"
      rounded="l-lg"
      m="l-2 b-1"
      v-for="child of record.children || []"
    >
      <RecordSliver :record="child" @reply="$emit('reply', $event)"> </RecordSliver>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecordSliver",
};
</script>
<script setup>
import dayjs from "dayjs";
import Attachments from "../file/Attachments.vue";
defineProps({
  record: Object,
});
</script>

<style lang="scss" scoped></style>
