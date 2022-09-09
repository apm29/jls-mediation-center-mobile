<template>
  <div h="100vh" flex="~ col" bg="gray-100">
    <div class="toolbar">
      <el-button
        size="medium"
        type="text"
        icon="el-icon-arrow-left"
        @click="$router.replace('/')"
      >
        首页
      </el-button>
      <h1 font="bold" mx="6">消息管理</h1>
      <div flex="grow"></div>
      <!-- <el-button size="mini" icon="el-icon-refresh" type="primary" plain @click="search">
        刷新
      </el-button> -->
      <el-button
        size="mini"
        icon="el-icon-plus"
        type="primary"
        plain
        @click="handleAddRecord"
      >
        发送消息
      </el-button>
    </div>
    <div
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      flex="grow"
      overflow="y-auto"
    >
      <PullTo
        :top-load-method="
          (loaded) =>
            onPagination({ refresh: true })
              .then(() => loaded('done'))
              .catch(() => loaded('fail'))
        "
        :bottom-load-method="
          (loaded) =>
            onPagination()
              .then(() => loaded('done'))
              .catch(() => loaded('fail'))
        "
      >
        <template #top-block="{ state, stateText }">
          <div
            class="top-load-wrapper"
            text="center sm gray-500"
            flex="~"
            justify="center"
            items="center"
          >
            {{ stateText }}
            <i i-mdi-loading animate="spin" v-if="state === 'loading'"></i>
            <i i-mdi-arrow-up v-if="state === 'trigger'"></i>
            <i i-mdi-check-circle v-if="state === 'loaded-done'" text="green-500"></i>
          </div>
        </template>
        <template #bottom-block="{ state, stateText }">
          <div
            class="bottom-load-wrapper"
            text="center sm gray-500"
            flex="~"
            justify="center"
            items="center"
          >
            {{ stateText }}
            <i i-mdi-loading animate="spin" v-if="state === 'loading'"></i>
            <i i-mdi-arrow-up v-if="state === 'trigger'"></i>
            <i i-mdi-check-circle v-if="state === 'loaded-done'" text="green-500"></i>
          </div>
        </template>
        <div v-for="record of records">
          <RecordSliver :record="record" @reply="handleReplyRecord"></RecordSliver>
        </div>
        <el-empty v-if="!records || !records.length" description="暂无消息"> </el-empty>
        <div h="30vh"></div>
      </PullTo>
    </div>
    <!-- <el-pagination
      border="t"
      bg="white"
      :current-page.sync="pageNo"
      :page-size.sync="pageSize"
      layout="total,  prev, pager, next"
      :total="total"
      @size-change="onPagination"
      @current-change="onPagination"
    >
    </el-pagination> -->
    <el-dialog title="发送消息" fullscreen :visible.sync="showEdit">
      <RecordEditor
        :form="form"
        @saved="search"
        :saving="saving"
        :personId="personId"
        :save="doSaveEditRecord"
      ></RecordEditor>
    </el-dialog>
  </div>
</template>

<script setup>
import PullTo from "vue-pull-to";
import { useRecordPaged, useEditRecord } from "~/composables";
import RecordEditor from "~/components/record/RecordEditor.vue";
import { useRoute } from "~/composables";
import dayjs from "dayjs";
import Attachments from "~/components/file/Attachments.vue";
import RecordSliver from "~/components/record/RecordSliver.vue";
const route = useRoute();
const personId = computed(() => route.query.personId);
//分页
const {
  loading,
  total,
  pageNo,
  pageSize,
  records,
  onPagination,
  search,
} = useRecordPaged(() => personId.value);
onMounted(onPagination);

//编辑新增
const {
  form,
  showEdit,
  handleAddRecord,
  handleReplyRecord,
  saving,
  doSaveEditRecord,
} = useEditRecord(() => personId.value);
</script>
