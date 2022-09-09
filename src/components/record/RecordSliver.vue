<template>
  <div class="record-sliver" text="sm" bg="white" border="t">
    <div class="sender-receiver" text="gray-400" p="x-4 t-4 b-1">
      <el-tag size="mini" type="info">
        {{ record.sendDeptName }} {{ record.sendUserName }}
      </el-tag>

      <span text="xs"> {{ record.parentId ? "回复" : "发送给" }} </span>

      <el-tag size="mini" type="info">
        {{ record.acceptDeptName }} {{ record.acceptUserName }}
      </el-tag>
    </div>
    <div class="sender-receiver" text="gray-400 xs" p="x-4 y-1">
      {{ dayjs(record.createTime).format("YYYY/MM/DD HH:mm") }}
    </div>
    <div class="content" p="x-4  t-1 b-3">
      {{ record.content }}
    </div>
    <Attachments hide-on-empty p="x-4" :files="record.file"></Attachments>
    <div class="action-bar" flex="~" justify="end" p="x-3">
      <el-button
        size="small"
        type="text"
        icon="el-icon-chat-line-round"
        @click="$emit('reply', record)"
        v-if="!record.parentId"
      >
        回复
      </el-button>
      <el-button
        size="small"
        type="text"
        :disabled="!record.children.length"
        @click="toggleMessage()"
      >
        <i i-mdi-chevron-down></i>
        消息({{ record.children.length }}条)
      </el-button>
    </div>
    <Transition name="el-zoom-in-top">
      <div v-show="showMessage">
        <div
          border="1 gray-200 l-4 l-gray-300"
          rounded="l-lg"
          m="l-2 b-1"
          v-for="child of record.children || []"
        >
          <RecordSliver :record="child" @reply="$emit('reply', $event)"> </RecordSliver>
        </div>
      </div>
    </Transition>
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
const [showMessage, toggleMessage] = useToggle();
</script>

<style lang="scss" scoped></style>
