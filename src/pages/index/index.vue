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
        @click="handleAddPerson"
      >
        新增人员
      </el-button>
    </div>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="persons"
      flex="grow"
      height="100%"
      border
    >
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column label="姓名" prop="name" width="90"></el-table-column>
      <el-table-column label="民族" prop="mz" width="90"></el-table-column>
      <el-table-column label="身份证" prop="idNo" width="200"></el-table-column>
      <el-table-column label="性别" prop="sex" width="90">
        <template #default="{ row }">
          {{ Gender[row.sex] }}
        </template>
      </el-table-column>
      <el-table-column label="入所原因" prop="reason" min-width="220">
        <template #default="{ row }">
          <TextContent :value="row.reason"></TextContent>
        </template>
      </el-table-column>
      <el-table-column label="违法犯罪性质" prop="wffzxz" width="190">
        <template #default="{ row }">
          <TextContent :value="row.wffzxz"></TextContent>
        </template>
      </el-table-column>
      <el-table-column label="办案单位" prop="baUnit" width="190">
        <template #default="{ row }">
          <TextContent :value="row.baUnit"></TextContent>
        </template>
      </el-table-column>
      <el-table-column label="拘留天数" prop="detentionDays" width="90"></el-table-column>
      <el-table-column label="入所日期" prop="startDate" width="140"></el-table-column>
      <el-table-column label="拘留结束日期" prop="endDate" width="140"> </el-table-column>
      <!-- <el-table-column label="矛盾化解工作情况" prop="mdhjgzqk" width="190">
        <template #default="{ row }">
          <TextContent :value="row.mdhjgzqk"></TextContent>
        </template>
      </el-table-column>
      <el-table-column label="矛盾化解结果" prop="mdhjjg" width="190">
        <template #default="{ row }">
          <TextContent :value="row.mdhjjg"></TextContent>
        </template>
      </el-table-column> -->
      <el-table-column prop="person" label="操作" width="240" fixed="right">
        <div slot-scope="{ row }">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-folder"
            @click="handleViewRelatedCases(row.ajxq, row)"
          >
            相关案件
          </el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleEditPerson(row)"
          >
            编辑
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-document"
            @click="handleViewWorkRecord(row)"
          >
            工作记录
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-chat-line-square"
            @click="handleViewRecord(row)"
          >
            消息
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            text="!red-500 !hover:red-400"
            @click="handleDeletePerson(row).then(search)"
          >
            删除
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
    <el-dialog
      title="编辑/新增人员"
      :visible.sync="showEdit"
      :close-on-click-modal="false"
    >
      <PersonEditor
        :form="form"
        @saved="search"
        :saving="saving"
        :save="doSaveEditPerson"
      ></PersonEditor>
    </el-dialog>
    <el-dialog title="相关案件" :visible.sync="showCases" :close-on-click-modal="false">
      <div table="~" border="collapse" w="full" text="center">
        <div table="header-group" font="bold" text="gray-800" bg="gray-200" opacity="80">
          <div table="cell" border="~ gray-300">姓名</div>
          <div table="cell" border="~ gray-300">文书号</div>
          <div table="cell" border="~ gray-300">违法性质</div>
          <div table="cell" border="~ gray-300">执行状态</div>
          <div table="cell" border="~ gray-300">操作</div>
        </div>
        <div table="row-group">
          <div :key="item.id" table="row" v-for="item of relatedCases">
            <div table="cell" border="~ gray-300">{{ relatedPerson.name }}</div>
            <div table="cell" border="~ gray-300">{{ item.fileNo }}</div>
            <div table="cell" border="~ gray-300">{{ item.wfxz }}</div>
            <div table="cell" border="~ gray-300">{{ ExecutionStatus[item.zxzt] }}</div>
            <div table="cell" border="~ gray-300">
              <el-button
                type="text"
                size="mini"
                icon="el-icon-info"
                m="!y-0"
                @click="handleViewCaseDetail(item)"
              >
                案件详情
              </el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                text="!red-500 !hover:red-400"
                m="!y-0"
                @click="handleDeleteRelatedCase(item)"
              >
                删除
              </el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                m="!y-0"
                @click="handleEditRelatedCase(item)"
              >
                编辑
              </el-button>
            </div>
          </div>
          <td
            v-if="!relatedCases || !relatedCases.length"
            colspan="5"
            table="cell"
            border="~ gray-300"
            p="6"
          >
            暂无相关案件
          </td>
        </div>
        <div table="row-group">
          <td colspan="5" table="cell" border="~ gray-300" p="6">
            <el-button
              type="text"
              icon="i-mdi-plus text-lg"
              flex="!inline"
              gap="1"
              items="center"
              @click="handleAddCase"
            >
              新增相关案件
            </el-button>
          </td>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      title="编辑/新增案件"
      :visible.sync="showEditCase"
      :close-on-click-modal="false"
    >
      <CaseEditor
        v-loading="savingCase"
        element-loading-text="正在保存"
        element-loading-spinner="el-icon-loading"
        :form="caseForm"
        :saving="savingCase"
        :save="handleSavePersonCase"
      ></CaseEditor>
    </el-dialog>

    <el-dialog title="案件详情" :visible.sync="showCase">
      <div>
        <h1 class="prefixed-title">基本信息</h1>
        <p class="paragraph">
          {{ caseDetail.jbxx }}
        </p>
        <h1 class="prefixed-title">具体内容</h1>
        <p class="paragraph">
          {{ caseDetail.jtnr }}
        </p>
        <h1 class="prefixed-title">附件</h1>
        <Attachments :files="caseDetail.file"></Attachments>
      </div>
    </el-dialog>

    <el-dialog title="矛盾化解工作记录" width="800px" :visible.sync="showWorkRecord">
      <div table="~" border="collapse" w="full" text="center">
        <div table="row-group">
          <div table="row">
            <td class="cell header" table="cell">被拘留人</td>
            <td class="cell" table="cell" colspan="3">{{ workRecord.name }}</td>
          </div>
          <div table="row">
            <td class="cell header" table="cell">拘留开始</td>
            <td class="cell" table="cell">{{ workRecord.startDate }}</td>
            <td class="cell header" table="cell">拘留结束</td>
            <td class="cell" table="cell">{{ workRecord.endDate }}</td>
          </div>
          <div table="row">
            <td class="cell header" table="cell">矛盾基本情况</td>
            <td class="cell" table="cell" colspan="3">
              <AutoResizeTextarea v-model="workRecord.mdjbqk"></AutoResizeTextarea>
            </td>
          </div>
          <div table="row">
            <td class="cell header" table="cell">矛盾化解工作情况</td>
            <td class="cell" table="cell" colspan="3">
              <AutoResizeTextarea v-model="workRecord.mdhjgzqk"></AutoResizeTextarea>
            </td>
          </div>
          <div table="row">
            <td class="cell header" table="cell">矛盾化解结果</td>
            <td class="cell" table="cell" colspan="3">
              <AutoResizeTextarea v-model="workRecord.mdhjjg"></AutoResizeTextarea>
            </td>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="handleSaveWorkRecord"> 保存 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { usePersonPaged, useEditPerson } from "~/composables";
import { useCasePaged, useEditCase } from "~/composables";
import CaseEditor from "~/components/case/CaseEditor.vue";
import PersonEditor from "~/components/person/PersonEditor.vue";
import TextContent from "~/components/content/TextContent.vue";
import Attachments from "~/components/file/Attachments.vue";
import AutoResizeTextarea from "~/components/text/AutoResizeTextarea.vue";
import { ExecutionStatus, Gender } from "~/helpers/enum.js";
import { useRouter } from "~/composables";
import { addPerson } from "~/api/person";

const router = useRouter();
//分页
const {
  loading,
  total,
  pageNo,
  pageSize,
  persons,
  onPagination,
  search,
} = usePersonPaged();
onMounted(onPagination);

//编辑新增
const {
  form,
  showEdit,
  handleAddPerson,
  handleDeletePerson,
  handleEditPerson,
  saving,
  doSaveEditPerson,
} = useEditPerson();

//编辑新增案件
const {
  form: caseForm,
  showEdit: showEditCase,
  handleAddCase,
  handleDeleteCase,
  handleEditCase,
  saving: savingCase,
  doSaveEditCase,
} = useEditCase();
//相关案件
const [showCases, toggleViewCases] = useToggle();
const relatedCases = ref([]);
const relatedPerson = ref({});

function handleViewRelatedCases(cases, person) {
  relatedCases.value = cases;
  relatedPerson.value = person;
  toggleViewCases();
}

async function handleEditRelatedCase(caseItem) {
  handleEditCase(caseItem);
}

async function handleDeleteRelatedCase(caseItem) {
  //修改相关案件
  relatedCases.value.splice(relatedCases.value.indexOf(caseItem), 1);
  relatedPerson.value.ajxx = relatedCases.value.map((it) => it.fileNo).join(",");
  //删除案件
  await handleDeleteCase(caseItem);
  //保存
  await addPerson(relatedPerson.value);
  //刷新
  search();
}

async function handleSavePersonCase() {
  //保存案件
  const caseSaved = await doSaveEditCase();
  const editIndex = relatedCases.value.findIndex((it) => it.id === caseSaved.id);
  if (editIndex >= 0) {
    //案件编辑
    relatedCases.value[editIndex] = caseSaved;
  } else {
    relatedCases.value.push(caseSaved);
  }
  //修改相关案件
  relatedPerson.value.ajxx = relatedCases.value.map((it) => it.fileNo).join(",");
  //保存
  await addPerson(relatedPerson.value);
  //刷新
  search();
}

//案件详情
const [showCase, toggleViewCase] = useToggle();
const caseDetail = ref({});
function handleViewCaseDetail(item) {
  caseDetail.value = item;
  toggleViewCase();
}

//工作记录
const [showWorkRecord, toggleWorkRecord] = useToggle();
const workRecord = ref({});
function handleViewWorkRecord(record) {
  workRecord.value = { ...record };
  toggleWorkRecord();
}

async function handleSaveWorkRecord() {
  //保存
  await addPerson(workRecord.value);
  //刷新
  search();
  toggleWorkRecord();
}

//矛盾化解记录
const [showRecord, toggleRecord] = useToggle();
const record = ref({});
function handleViewRecord(row) {
  // record.value = row;
  // toggleRecord();
  router.push({
    path: "/records",
    query: {
      personId: row.id,
    },
  });
}
</script>

<style scoped>
.cell[table="cell"] {
  @apply border border-gray-300 min-w-24 px-2 py-1 text-left;
}
.header {
  @apply bg-gray-100 font-bold w-30;
  vertical-align: top;
}
</style>
