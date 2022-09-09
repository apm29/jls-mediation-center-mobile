<template>
  <div table="~" border="collapse" w="full">
    <div
      table="header-group"
      font="bold"
      text="center gray-800"
      bg="gray-200"
      opacity="80"
    >
      <div table="cell" border="~ gray-300">姓名</div>
      <div table="cell" border="~ gray-300">文书号</div>
      <!-- <div table="cell" border="~ gray-300">违法性质</div> -->
      <!-- <div table="cell" border="~ gray-300">执行状态</div> -->
      <div table="cell" border="~ gray-300">操作</div>
    </div>
    <div table="row-group" text="center">
      <div :key="item.id" table="row" v-for="item of cases">
        <div table="cell" border="~ gray-300">{{ relatedPerson.name }}</div>
        <div table="cell" border="~ gray-300">{{ item.fileNo }}</div>

        <div table="cell" border="~ gray-300">
          <el-button type="text" size="mini" m="!y-0" @click="handleViewCaseDetail(item)">
            案件详情
          </el-button>
        </div>
      </div>
      <td
        v-if="!cases || !cases.length"
        colspan="5"
        table="cell"
        border="~ gray-300"
        p="6"
      >
        暂无相关案件
      </td>
    </div>
    <!-- <div table="row-group">
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
        </div> -->
    <PartialModal title="案件详情" v-model="showCase">
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
    </PartialModal>
  </div>
</template>

<script setup>
import { ExecutionStatus, Gender } from "~/helpers/enum.js";
import Attachments from "~/components/file/Attachments.vue";
import PartialModal from "../modal/PartialModal.vue";
defineProps({
  cases: Array,
  relatedPerson: Object,
});

//案件详情
const [showCase, toggleViewCase] = useToggle();
const caseDetail = ref({});
function handleViewCaseDetail(item) {
  caseDetail.value = item;
  toggleViewCase();
}
</script>

<style scoped>
.cell[table="cell"] {
  @apply border border-gray-300 min-w-4em px-2 py-1 text-left;
}
.header {
  @apply bg-gray-100 font-bold w-6em;
  vertical-align: top;
}
</style>
