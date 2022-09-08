import { remote } from "~/composables";

export function login({
  password, phone
}) {
  return remote.postForm({
    url: "/java/admin/login",
    data: {
      password, phone
    },
  })
}


export function loginByPhone({
  phone
}) {
  return remote.postForm({
    url: "/java/user/getToken",
    data: {
      phone
    },
  })
}
