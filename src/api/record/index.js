import { remote } from "~/composables";

export function addRecord(form) {
  return remote.postForm({
    url: "/java/resolve/add",
    data: form,
    showSuccessMessage: true
  })
}

export function deleteRecord(id) {
  return remote.postForm({
    url: "/java/resolve/delete",
    data: {
      id
    },
    showSuccessMessage: true
  })
}

export function getPagedRecords({
  pageNo, pageSize, personId
}) {
  return remote.postForm({
    url: "/java/resolve/findListByPage",
    data: {
      pageNo, pageSize, personId
    },
  })
}
