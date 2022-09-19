<template>
  <div
    h="screen"
    w="screen"
    bg="[#1E293B]"
    overflow="hidden"
    flex="~"
    justify="center"
    items="center"
  >
    <el-form size="mini" :model="form" label-position="left" label-width="0">
      <h2 text="2xl white center" m="y-8">矛盾化解全流程云服务平台</h2>
      <el-form-item label="">
        <el-input v-model="form.phone" placeholder="输入手机号">
          <template #prepend> 手机 </template>
        </el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="输入密码"
          show-password
        >
          <template #prepend> 密码 </template>
        </el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button block="~" w="full" type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { login } from "~/api/auth";
import router from "~/router";
import { useAppStore } from "~/store/app";
const appStore = useAppStore();
const form = reactive({
  password: "",
  phone: "",
});
function handleLogin() {
  login(form)
    .then((res) => {
      appStore.setToken(res.token);
      appStore.setUserInfo(res.data);
    })
    .then(() => {
      router.push("/");
    });
}
</script>

<style lang="scss" scoped></style>
