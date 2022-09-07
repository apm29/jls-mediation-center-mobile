import { remote } from "~/composables";

export function addCase({
  //文书号
  fileNo,
  //附件
  file,
  //id
  id,
  //基本信息
  jbxx,
  //具体内容
  jtnr,
  //违法性质
  wfxz,
  //执行状态（1已执行0未执行）
  zxzt
}) {
  return remote.postForm({
    url: "/java/case/add",
    data: {
      fileNo, file, id, jbxx, jtnr, wfxz, zxzt
    },
    showSuccessMessage: false
  })
}

export function deleteCase(id) {
  return remote.postForm({
    url: "/java/case/delete",
    data: {
      id
    },
    showSuccessMessage: true
  })
}

export function getPagedCases({
  pageNo, pageSize,
}) {
  return remote.postForm({
    url: "/java/case/findListByPage",
    data: {
      pageNo, pageSize,
    },
  })
}
