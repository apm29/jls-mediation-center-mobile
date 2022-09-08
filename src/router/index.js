import routes from '~pages'
import VueRouter from "vue-router";
import NProgress from 'nprogress'
import { useAppStore } from "~/store/app"
import { loginByPhone } from '~/api/auth';
const router = new VueRouter({
  routes
});

export default router

const WHITE_LIST = ["/login"]

router.beforeEach((to, from, next) => {
  const appStore = useAppStore()
  NProgress.start()
  // instance.value = Loading.service({
  //   fullscreen: true,
  //   lock: true,
  //   text: "正在前往目的地"
  // })
  if (appStore.hasLogin && !to.query.phone) {
    next()
  } else if (WHITE_LIST.includes(to.path)) {
    next()
  } else {
    console.log("未登录");
    loginByPhone({ phone: to.query.phone }).then(res => {
      appStore.name = res.data.name;
      appStore.phone = res.data.phone;
      appStore.token = res.token;
      next()
    }).catch(err => {
      console.log(err);
      next({
        path: "/login",
        query: {
          redirect: encodeURIComponent(to.fullPath)
        }
      })
    })

  }
})
router.afterEach((to, from) => {
  NProgress.done()
  // instance.value?.close()
})
