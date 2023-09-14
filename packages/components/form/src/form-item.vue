<template>
  <el-form-item :prop="prop.id" v-bind="elFromProps">
    <template #label>
      <component v-if="typeof prop.label === 'function'" :is="prop.label" />
      <span v-else>{{ prop.label }}</span>
    </template>
    <span v-if="!prop.component"></span>
    <component v-else :is="prop.component" v-bind="prop.el" v-model="value" />
  </el-form-item>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { formItemProps } from "./types";

defineOptions({ name: "ul-form-item" });
const props = defineProps(formItemProps);
const emit = defineEmits(["update:modelValue"]);

const elFromProps = computed(() => {
  const {
    id,
    label,
    component,
    el,
    default: init,
    options,
    optionsConfig = { label: "label", value: "value" },
    ...rest
  } = props.prop;
  return rest;
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(v) {
    emit("update:modelValue", v);
  },
});
</script>

<style scoped></style>
