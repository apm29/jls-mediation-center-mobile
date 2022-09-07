<template>
  <div h="full" flex="~ col">
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
      <el-button size="mini" icon="el-icon-refresh" type="primary" plain @click="search">
        刷新
      </el-button>
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
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="records"
      flex="grow"
      height="100%"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children' }"
      border
    >
      <el-table-column prop="" label="" min-width="65"></el-table-column>
      <el-table-column label="内容" prop="content" min-width="280">
        <template #default="{ row }">
          <TextContent :value="row.content"></TextContent>
        </template>
      </el-table-column>
      <el-table-column label="附件" prop="file" min-width="120">
        <template #default="{ row }">
          <Attachments :files="row.file"></Attachments>
        </template>
      </el-table-column>
      <el-table-column label="时间" prop="createTime" width="190">
        <template #default="{ row }">
          {{ dayjs(row.createTime).format("YYYY/MM/DD HH:mm") }}
        </template>
      </el-table-column>
      <el-table-column label="接收人" prop="acceptUserName" width="160">
        <div slot-scope="{ row }">
          {{ row.acceptDeptName }} -
          {{ row.acceptUserName }}
        </div>
      </el-table-column>
      <el-table-column label="发送人" prop="sendUserName" width="160">
        <div slot-scope="{ row }">
          {{ row.sendDeptName }} -
          {{ row.sendUserName }}
        </div>
      </el-table-column>
      <el-table-column prop="record" label="操作" width="160" fixed="right">
        <div slot-scope="{ row }">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-chat"
            @click="handleReplyRecord(row)"
          >
            回复
          </el-button>
        </div>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="pageNo"
      :page-sizes="[30, 50, 100, 500]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="onPagination"
      @current-change="onPagination"
    >
    </el-pagination>
    <el-dialog title="发送消息" :visible.sync="showEdit">
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
import { useRecordPaged, useEditRecord } from "~/composables";
import RecordEditor from "~/components/record/RecordEditor.vue";
import TextContent from "~/components/content/TextContent.vue";
import { useRoute } from "~/composables";
import dayjs from "dayjs";
import Attachments from "~/components/file/Attachments.vue";
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
