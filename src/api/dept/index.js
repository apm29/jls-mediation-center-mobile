import { remote } from "~/composables";

export function getDept() {
  return remote.postForm({
    url: "/java/dept/findList"
  })
}
