<template>
  <el-container h="full" flex="~">
    <el-aside p="!x-0" w="!220px">
      <el-menu
        router
        :default-active="$route.path"
        class="el-menu-demo"
        background-color="rgb(30, 41, 59)"
        text-color="#fff"
        active-text-color="#ffd04b"
        h="full"
        flex="!~ col"
      >
        <h1 text="lg white" p="x-20px t-6">
          <img
            src="/logo.svg"
            w="8"
            h="8"
            inline="block"
            m="x-2"
            p="1"
            bg="white"
            rounded="full"
          />
          矛盾化解平台
        </h1>
        <el-divider bg="!gray-700" />

        <!-- <el-menu-item index="/" bg="!hover:yellow-100/30">
          <span slot="title">案件信息</span>
          <i i-mdi-briefcase-outline text="lg" m="x-2"></i>
        </el-menu-item> -->
        <el-menu-item index="/" bg="!hover:yellow-100/30">
          <span slot="title">矛盾化解人员</span>
          <i i-mdi-account-cog-outline text="lg" m="x-2"></i>
        </el-menu-item>
        <!-- <el-menu-item index="/records">
          <span slot="title">矛盾化解记录</span>
          <i i-mdi-format-list-bulleted text="lg" m="x-2"></i>
        </el-menu-item> -->
        <div flex="grow"></div>
        <li flex="~" items="center" h="60px" justify="start" px="20px">
          <button
            @click="handleLogout"
            cursor="pointer"
            flex="~"
            items="center"
            text="[#ff3311] sm"
            font="bold"
          >
            <i i-carbon-power text="lg" mx="2"></i>
            退出
          </button>
        </li>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main flex="grow" overflow="hidden">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import router from "~/router";
import { useAppStore } from "~/store/app";
const appStore = useAppStore();

function handleLogout() {
  appStore.token = null;
  router.replace("/login");
}
</script>

<style lang="scss" scoped>
.router-link {
  @apply flex flex-col items-center text-white bg-sky-600 px-12 py-8 hover:shadow transition-all;
  i {
    @apply text-5xl;
  }
}
</style>
