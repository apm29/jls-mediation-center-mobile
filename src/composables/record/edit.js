import { addRecord, deleteRecord } from "~/api/record";

export function useEditRecord(getPersonId) {
  const personId = computed(getPersonId);
  const form = reactive({
    acceptDeptId: null,
    acceptUserId: null, //接收人用户id
    content: null, //内容
    file: null, //附件地址（多个以逗号分隔）
    id: null, //主键id
    personId: null, //矛盾化解人员id
    parentId: null, //父级id
  });

  const [showEdit, toggleEdit] = useToggle();
  function handleAddRecord() {
    Object.keys(form).forEach((key) => {
      form[key] = null;
    });
    toggleEdit();
  }

  function handleReplyRecord(item) {
    Object.keys(form).forEach((key) => {
      form[key] = null;
    });
    form.parentId = item.id;
    form.acceptUserId = item.sendUserId;
    form.acceptDeptId = item.sendDeptId;
    form.attatchments = [];
    toggleEdit();
  }

  const saving = ref();
  async function doSaveEditRecord() {
    form.file = form.attatchments ? form.attatchments.join(",") : "";
    saving.value = true;
    try {
      await addRecord({
        ...form,
        personId: unref(personId),
      });
      toggleEdit();
    } finally {
      saving.value = false;
    }
  }

  function handleDeleteRecord({ id }) {
    return deleteRecord(id);
  }

  return {
    form,
    showEdit,
    handleAddRecord,
    handleDeleteRecord,
    handleReplyRecord,
    saving,
    doSaveEditRecord,
  };
}
