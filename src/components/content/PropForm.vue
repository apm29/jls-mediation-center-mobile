<template>
  <el-form-item v-bind="$attrs" :label="label" :prop="prop">
    <component
      :is="
        selection
          ? 'el-select'
          : number
          ? 'el-input-number'
          : date
          ? 'el-date-picker'
          : 'el-input'
      "
      :type="date ? date : textarea ? 'textarea' : 'input'"
      :rows="4"
      :placeholder="`输入${label}`"
      v-model="form[prop]"
      format="yyyy年MM月dd日"
      value-format="yyyy-MM-dd"
    >
      <template v-if="selection">
        <el-option
          v-for="option of selection"
          :key="option.value"
          :value="option.value"
          :label="option.label"
        >
        </el-option>
      </template>
    </component>
  </el-form-item>
</template>

<script setup>
const props = defineProps({
  label: String,
  prop: String,
  textarea: Boolean,
  number: Boolean,
  date: String,
  selection: Array,
});

const form = inject("form");
const rules = inject("rules");
rules[props.prop] = [
  {
    message: `请输入${props.label}`,
    trigger: props.selection ? "change" : "blur",
    validator: function (rule, value, callback) {
      if (!value && value !== 0) {
        callback(new Error(`请输入${props.label}`));
      } else {
        callback();
      }
    },
  },
];
</script>
