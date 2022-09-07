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
