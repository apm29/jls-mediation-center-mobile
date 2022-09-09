<template>
  <div w="full">
    <div table="~" border="collapse" w="full">
      <div table="header-group">
        <div table="row">
          <div table="cell" class="header">姓名</div>
          <div table="cell">{{ person.name }}</div>
          <div table="cell" class="header">民族</div>
          <div table="cell">{{ person.mz }}</div>
        </div>
        <div table="row">
          <div table="cell" class="header">身份证</div>
          <td table="cell" colspan="3">{{ person.idNo }}</td>
        </div>
        <div table="row">
          <div table="cell" class="header">入所原因</div>
          <td table="cell">{{ person.reason }}</td>
          <div table="cell" class="header">性别</div>
          <div table="cell">{{ Gender[person.sex] }}</div>
        </div>
        <div table="row">
          <div table="cell" class="header">违法犯罪性质</div>
          <td table="cell" colspan="5">{{ person.wffzxz }}</td>
        </div>
        <div table="row">
          <div table="cell" class="header">办案单位</div>
          <td table="cell" colspan="5">{{ person.baUnit }}</td>
        </div>
        <div table="row">
          <div table="cell" class="header">拘留天数</div>
          <td table="cell" colspan="5">
            {{ person.detentionDays }}天 ({{ person.endDate }} 到 {{ person.startDate }})
          </td>
        </div>
      </div>
    </div>
    <h1 class="prefixed-title" m="y-3">工作记录</h1>
    <div table="~" border="collapse" w="full" text="center">
      <div table="row-group">
        <div table="row">
          <td class="cell header" table="cell">被拘留人</td>
          <td class="cell" table="cell" colspan="3">{{ person.name }}</td>
        </div>
        <div table="row">
          <td class="cell header" table="cell">拘留开始</td>
          <td class="cell" table="cell">{{ person.startDate }}</td>
        </div>
        <div table="row">
          <td class="cell header" table="cell">拘留结束</td>
          <td class="cell" table="cell">{{ person.endDate }}</td>
        </div>
        <div table="row">
          <td class="cell header" table="cell">矛盾基本情况</td>
          <td class="cell" table="cell" colspan="3">
            {{ person.mdjbqk }}
          </td>
        </div>
        <div table="row">
          <td class="cell header" table="cell">矛盾化解工作情况</td>
          <td class="cell" table="cell" colspan="3">
            {{ person.mdhjgzqk }}
          </td>
        </div>
        <div table="row">
          <td class="cell header" table="cell">矛盾化解结果</td>
          <td class="cell" table="cell" colspan="3">
            {{ person.mdhjjg }}
          </td>
        </div>
      </div>
    </div>
    <h1 class="prefixed-title" m="y-3">相关案件</h1>
    <RelatedCases :cases="person.ajxq" :relatedPerson="person"></RelatedCases>
  </div>
</template>

<script setup>
import { ExecutionStatus, Gender } from "~/helpers/enum.js";
import RelatedCases from "~/components/case/RelatedCases.vue";
defineProps({
  person: Object,
});
</script>

<style lang="scss" scoped>
div[table="cell"],
td[table="cell"] {
  @apply border border-gray-300 min-w-4em px-2 py-1 text-left;
}
.header {
  @apply bg-gray-100 font-bold w-6em;
  vertical-align: top;
}
</style>
