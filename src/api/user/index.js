import { remote } from "~/composables";

export function getUsers({
  deptId,
  pageNo,
  pageSize
}) {
  return remote.postForm({
    url: "/java/user/findListByPage",
    data: {
      deptId,
      pageNo,
      pageSize
    }
  })
}
