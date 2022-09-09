<template>
  <div h="full" flex="~ col" border="~" rounded="lg" bg="gray-100">
    <div class="toolbar">
      <el-button
        size="medium"
        type="text"
        icon="el-icon-arrow-left"
        @click="$router.replace('/')"
      >
        首页
      </el-button>
      <h1 flex="grow" mx="6" font="bold">矛盾化解人员</h1>
      <el-button size="mini" icon="el-icon-refresh" type="primary" plain @click="search">
        {{ searchName ? "搜索" : "刷新" }}
      </el-button>
      <!-- <el-button
        size="mini"
        icon="el-icon-plus"
        type="primary"
        plain
        @click="handleAddPerson"
      >
        新增人员
      </el-button> -->
    </div>
    <el-input
      placeholder="按姓名搜索"
      v-model="searchName"
      @input="search"
      m="x-2 t-1"
      w="![calc(100%-1rem)]"
      clearable
    ></el-input>
    <div
      flex="grow"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      overflow="auto"
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
        <div
          v-for="person of persons"
          border="1 gray-200"
          rounded="lg"
          w="![calc(100%-1rem)]"
          p="x-3 y-2"
          m="y-1 x-2"
          bg="white"
          shadow="~"
        >
          <PersonInfo :person="person"></PersonInfo>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-folder"
            @click="handleViewRelatedCases(person.ajxq, person)"
          >
            相关案件
          </el-button>

          <!-- <el-button
          size="mini"
          type="text"
          icon="el-icon-edit"
          @click="handleEditPerson(person)"
        >
          编辑
        </el-button> -->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-document"
            @click="handleViewWorkRecord(person)"
          >
            工作记录
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-document"
            @click="handleViewPersonDetail(person)"
          >
            详情
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-chat-line-square"
            @click="handleViewRecord(person)"
          >
            消息
          </el-button>
          <!-- <el-button
          size="mini"
          type="text"
          icon="el-icon-delete"
          text="!red-500 !hover:red-400"
          @click="handleDeletePerson(person).then(search)"
        >
          删除
        </el-button> -->
        </div>
        <el-empty v-if="!persons || !persons.length" description="未查询到矛盾化解人员">
        </el-empty>
      </PullTo>
    </div>
    <!-- <el-pagination
      border="t"
      bg="white"
      :current-page.sync="pageNo"
      :page-size.sync="pageSize"
      layout="total, prev, pager, next"
      :total="total"
      @size-change="onPagination"
      @current-change="onPagination"
    >
    </el-pagination> -->
    <el-dialog
      title="编辑/新增人员"
      :visible.sync="showEdit"
      :close-on-click-modal="false"
      fullscreen
    >
      <PersonEditor
        :form="form"
        @saved="search"
        :saving="saving"
        :save="doSaveEditPerson"
      ></PersonEditor>
    </el-dialog>
    <PartialModal title="相关案件" fullscreen v-model="showCases">
      <RelatedCases :related-person="relatedPerson" :cases="relatedCases" />
    </PartialModal>

    <el-dialog
      fullscreen
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
    <el-dialog
      fullscreen
      title="人员详情"
      :visible.sync="showPersonDetail"
      :close-on-click-modal="false"
    >
      <PersonDetail :person="personDetail"></PersonDetail>
    </el-dialog>

    <el-dialog fullscreen title="案件详情" :visible.sync="showCase">
      <div>
        <h1 class="prefixed-title">基本信息</h1>
        <p class="paragraph">
          {{ caseDetail.jbxx }}
        </p>
        <h1 class="prefixed-title">具体内容</h1>
        <p class="paragraph">
          {{ caseDetail.jtnr }}
        </p>
        <h1 class="prefixed-title">违法性质</h1>
        <p class="paragraph">{{ caseDetail.wfxz }}</p>
        <h1 class="prefixed-title">执行状态</h1>
        <p class="paragraph">{{ ExecutionStatus[caseDetail.zxzt] }}</p>
        <h1 class="prefixed-title">附件</h1>
        <Attachments :files="caseDetail.file"></Attachments>
      </div>
    </el-dialog>

    <PartialModal
      fullscreen
      title="矛盾化解工作记录"
      width="800px"
      v-model="showWorkRecord"
    >
      <div table="~" border="collapse" w="full" text="center">
        <div table="row-group">
          <div table="row">
            <td class="cell header" table="cell">被拘留人</td>
            <td class="cell" table="cell" colspan="3">{{ workRecord.name }}</td>
          </div>
          <div table="row">
            <td class="cell header" table="cell">拘留开始</td>
            <td class="cell" table="cell">{{ workRecord.startDate }}</td>
          </div>
          <div table="row">
            <td class="cell header" table="cell">拘留结束</td>
            <td class="cell" table="cell">{{ workRecord.endDate }}</td>
          </div>
          <div table="row">
            <td class="cell header" table="cell">矛盾基本情况</td>
            <td class="cell" table="cell" colspan="3">
              <AutoResizeTextarea
                readonly
                v-model="workRecord.mdjbqk"
              ></AutoResizeTextarea>
            </td>
          </div>
          <div table="row">
            <td class="cell header" table="cell">矛盾化解工作情况</td>
            <td class="cell" table="cell" colspan="3">
              <AutoResizeTextarea
                readonly
                v-model="workRecord.mdhjgzqk"
              ></AutoResizeTextarea>
            </td>
          </div>
          <div table="row">
            <td class="cell header" table="cell">矛盾化解结果</td>
            <td class="cell" table="cell" colspan="3">
              <AutoResizeTextarea
                readonly
                v-model="workRecord.mdhjjg"
              ></AutoResizeTextarea>
            </td>
          </div>
        </div>
      </div>
      <div slot="footer">
        <!-- <el-button type="primary" @click="handleSaveWorkRecord"> 保存 </el-button> -->
      </div>
    </PartialModal>
  </div>
</template>

<script setup>
import PullTo from "vue-pull-to";
import { usePersonPaged, useEditPerson } from "~/composables";
import { useCasePaged, useEditCase } from "~/composables";
import CaseEditor from "~/components/case/CaseEditor.vue";
import RelatedCases from "~/components/case/RelatedCases.vue";
import PersonEditor from "~/components/person/PersonEditor.vue";
import PartialModal from "~/components/modal/PartialModal.vue";
import TextContent from "~/components/content/TextContent.vue";
import Attachments from "~/components/file/Attachments.vue";
import AutoResizeTextarea from "~/components/text/AutoResizeTextarea.vue";
import { ExecutionStatus, Gender } from "~/helpers/enum.js";
import { useRouter } from "~/composables";
import { addPerson } from "~/api/person";
import PersonInfo from "~/components/person/PersonInfo.vue";
import PersonDetail from "~/components/person/PersonDetail.vue";

const router = useRouter();
//分页
const {
  loading,
  searchName,
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

//详情
const [showPersonDetail, togglePersonDetail] = useToggle();
const personDetail = ref({});
function handleViewPersonDetail(record) {
  personDetail.value = { ...record };
  togglePersonDetail();
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
    path: "/app/records",
    query: {
      personId: row.id,
    },
  });
}
</script>

<style scoped>
.cell[table="cell"] {
  @apply border border-gray-300 min-w-4em px-2 py-1 text-left text-sm;
}
.header {
  @apply bg-gray-100 font-bold w-6em;
  vertical-align: top;
}
</style>
