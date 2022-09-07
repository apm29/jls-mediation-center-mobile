import { addPerson, deletePerson } from "~/api/person";

export function useEditPerson() {
  const form = reactive({
    id: null, name: null, sex: null, nationality: null, mz: null,
    fjszd: null, hjszd: null, startDate: null, endDate: null,
    detentionDays: null, reason: null, baUnit: null, wffzxz: null,
    mdhjgzqk: null, mdhjjg: null, mdjbqk: null, ajxx: null, createTime: null,
    idNo: null,
  });

  const [showEdit, toggleEdit] = useToggle();
  function handleAddPerson() {
    Object.keys(form).forEach(key => {
      form[key] = null
    })
    toggleEdit();
  }

  function handleEditPerson(item) {
    Object.keys(form).forEach(key => {
      form[key] = item[key]
    })
    toggleEdit();
  }

  const saving = ref();
  async function doSaveEditPerson() {
    saving.value = true;
    try {
      await addPerson(form);
      toggleEdit();
    } finally {
      saving.value = false;
    }
  }

  function handleDeletePerson({ id }) {
    return deletePerson(id);
  }

  return {
    form,
    showEdit,
    handleAddPerson,
    handleDeletePerson,
    handleEditPerson,
    saving,
    doSaveEditPerson,
  };
}
