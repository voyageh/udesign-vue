<template>
  <el-form ref="formRef" :class="[ns.b()]" v-bind="elFromProps" :model="form">
    <template v-for="{ type, items, ...rest } in content">
      <el-row v-if="type === 'row' && items">
        <el-col v-for="{ span, ...child } in items" :span="span">
          <ul-form-item :prop="child" v-model="form[child.id!]"></ul-form-item>
        </el-col>
      </el-row>
      <ul-form-item v-else :prop="rest" v-model="form[rest.id!]"></ul-form-item>
    </template>
    <el-form>
      <slot />
    </el-form>
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useNamespace } from "@udesign-vue/hooks";
import type { FormInstance } from "element-plus";
import { useVModel } from "@udesign-vue/hooks";
import { cloneDeep } from "lodash-es";
import UlFormItem from "./form-item.vue";
import { formProps, type IFormItem } from "./types";

defineOptions({ name: "ul-form" });
const props = defineProps(formProps);
const emit = defineEmits(["update:modelValue"]);

const ns = useNamespace("form");
const formRef = ref<FormInstance>();
const form = useVModel(props, "modelValue", emit);

const elFromProps = computed(() => {
  const { content, ...rest } = props;
  return rest;
});

const getDefaultValue = (list: IFormItem[]) => {
  const defaultValue: Record<string, any> = {};

  const handle = (arr: IFormItem[]) => {
    arr.forEach((item) => {
      if (item.items && item.items.length > 0) {
        handle(item.items);
      }

      if (item.id && item.default) {
        defaultValue[item.id] = item.default;
      }
    });
  };
  handle(list);
  return defaultValue;
};

watch(
  () => props.content,
  (v) => {
    const defaultValue = getDefaultValue(v);
    form.value = Object.assign({}, defaultValue, form.value);
  },
  {
    immediate: true,
    deep: true,
  }
);

const getFormValue = () => {
  return cloneDeep(form.value);
};

const updateForm = (newValue: Object) => {
  form.value = cloneDeep(newValue);
  formRef.value?.clearValidate();
};

const updateValue = (value: Object) => {
  form.value = Object.assign({}, form.value, value);
  formRef.value?.clearValidate();
};

const validate = () => formRef.value?.validate;
const resetFields = () => formRef.value?.resetFields;
const clearValidate = () => formRef.value?.clearValidate;

defineExpose({
  validate,
  resetFields,
  clearValidate,
  getFormValue,
  updateForm,
  updateValue,
});
</script>
