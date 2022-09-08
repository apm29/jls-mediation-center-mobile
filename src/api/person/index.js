import { remote } from "~/composables";

export function addPerson({
  ajxx,
  baUnit,
  detentionDays,
  endDate,
  fjszd,
  hjszd,
  id,
  idNo,
  ajxq,
  mdhjgzqk,
  mdhjjg,
  mdjbqk,
  mz,
  name,
  nationality,
  reason,
  sex,
  startDate,
  wffzxz,
}) {
  return remote.postForm({
    url: "/java/person/add",
    data: {
      ajxx,
      baUnit,
      detentionDays,
      endDate,
      fjszd,
      hjszd,
      id,
      idNo,
      ajxq,
      mdhjgzqk,
      mdhjjg,
      mdjbqk,
      mz,
      name,
      nationality,
      reason,
      sex,
      startDate,
      wffzxz,
    },
    showSuccessMessage: true
  })
}

export function deletePerson(id) {
  return remote.postForm({
    url: "/java/person/delete",
    data: {
      id
    },
    showSuccessMessage: true
  })
}

export function getPagedPersons({
  pageNo, pageSize, name
}) {
  return remote.postForm({
    url: "/java/person/findListByPage",
    data: {
      pageNo, pageSize, name
    },
  })
}
