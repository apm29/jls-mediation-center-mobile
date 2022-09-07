<template>
  <label>
    <textarea
      v-bind="$attrs"
      ref="input"
      :placeholder="placeholder || '请填写内容'"
      class="input-content"
      style="line-height: 1em"
      :value="value"
      @input="handleInput($event.target, $event.target.value)"
    />
  </label>
</template>
<script>
export default {
  name: "AutoResizeTextarea",
  props: {
    value: String,
    placeholder: String,
  },
  mounted() {
    this.handleResize(this.$refs.input);
  },
  methods: {
    handleInput: function (input, value) {
      this.$emit("input", value);
      this.handleResize(input);
    },
    handleResize(input) {
      input.style.height = "calc(3em + 12px)";
      input.style.height = input.scrollHeight + "px";
    },
  },
};
</script>
<style scoped>
.input-content {
  @apply w-full resize-none p-6px
  focus:outline focus:outline-blue-500;
  min-height: calc(3em + 12px);
}
textarea,
textarea:disabled {
  @apply bg-transparent;
}
</style>
