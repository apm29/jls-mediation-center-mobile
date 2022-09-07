<template>
  <div h="full" flex="~ col" border="~" rounded="lg">
    <div class="toolbar">
      <el-button size="mini" icon="el-icon-refresh" type="primary" plain @click="search">
        刷新
      </el-button>
      <el-button
        size="mini"
        icon="el-icon-plus"
        type="primary"
        plain
        @click="handleAddCase"
      >
        新增案件
      </el-button>
    </div>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="cases"
      flex="grow"
      height="100%"
    >
      <el-table-column prop="id" label="ID" width="90"></el-table-column>
      <el-table-column prop="fileNo" label="文书号" width="140"></el-table-column>
      <el-table-column prop="jbxx" label="基本信息" min-width="160">
        <template #default="{ row }">
          <TextContent :value="row.jbxx"></TextContent>
        </template>
      </el-table-column>
      <el-table-column prop="jtnr" label="具体内容" min-width="160">
        <template #default="{ row }">
          <TextContent :value="row.jtnr"></TextContent>
        </template>
      </el-table-column>
      <el-table-column prop="wfxz" label="违法性质" width="90"> </el-table-column>
      <el-table-column prop="zxzt" label="执行状态" width="90">
        <template #default="{ row }">
          {{ row.zxzt === 0 ? "未执行" : row.zxzt === 1 ? "已执行" : "未知" }}
        </template>
      </el-table-column>
      <el-table-column prop="case" label="操作" width="160" fixed="right">
        <div slot-scope="{ row }">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            text="!red-500 !hover:red-400"
            @click="handleDeleteCase(row).then(search)"
          >
            删除
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleEditCase(row)"
          >
            编辑
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
    <el-dialog title="编辑/新增案件" :visible.sync="showEdit">
      <CaseEditor
        :form="form"
        @saved="search"
        :saving="saving"
        :save="doSaveEditCase"
      ></CaseEditor>
    </el-dialog>
  </div>
</template>

<script setup>
import { useCasePaged, useEditCase } from "~/composables";
import CaseEditor from "~/components/case/CaseEditor.vue";
import TextContent from "~/components/content/TextContent.vue";

//分页
const { loading, total, pageNo, pageSize, cases, onPagination, search } = useCasePaged();
onMounted(onPagination);

//编辑新增
const {
  form,
  showEdit,
  handleAddCase,
  handleDeleteCase,
  handleEditCase,
  saving,
  doSaveEditCase,
} = useEditCase();
</script>
