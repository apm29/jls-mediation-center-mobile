import { addCase, deleteCase } from "~/api/case";

export function useEditCase() {
  const form = reactive({
    //id
    id: null,
    //附件逗号隔开
    file: [],
    //文书号
    fileNo: null,
    //基本信息
    jbxx: null,
    //具体内容
    jtnr: null,
    //违法性质
    wfxz: null,
    //执行状态（1已执行0未执行）
    zxzt: 0,
  });

  const [showEdit, toggleEdit] = useToggle();
  function handleAddCase() {
    form.id = null;
    toggleEdit();
  }

  function handleEditCase(item) {
    Object.keys(form).forEach(key => {
      form[key] = item[key]
    })
    form.attatchments = []
    toggleEdit();
  }

  const saving = ref();
  async function doSaveEditCase() {
    saving.value = true;
    form.file = form.attatchments ? form.attatchments.join(",") : ""
    try {
      await addCase(form);
      toggleEdit();
      return form;
    } finally {
      saving.value = false;
    }
  }

  function handleDeleteCase({ id }) {
    return deleteCase(id);
  }

  return {
    form,
    showEdit,
    handleAddCase,
    handleDeleteCase,
    handleEditCase,
    saving,
    doSaveEditCase,
  };
}
