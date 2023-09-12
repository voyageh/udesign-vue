import { defineComponent, h, ref, watch } from "vue";
import { useNamespace } from "@udesign-vue/hooks";
import {
  type FormInstance,
  ElForm,
  ElRow,
  ElCol,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElSelect,
  ElOption,
  ElDatePicker,
} from "element-plus";
import { cloneDeep } from "lodash-es";
import { useVModel } from "@udesign-vue/utils";
import { formProps, IFormItem } from "./types";

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

export default defineComponent({
  props: formProps,
  setup(props, { slots, expose, emit }) {
    const { content, ...elFromProps } = props;

    const ns = useNamespace("form");
    const formRef = ref<FormInstance>();
    const form = useVModel(props, "modelValue", emit);

    const generate = (data: IFormItem) => {
      const { id, label, component, el, options, optionsConfig = { label: "label", value: "value" }, ...rest } = data;

      if (!component) return null;
      console.log(component);

      return (
        <ElFormItem {...rest} prop={id}>
          {{
            label: () => (typeof label === "function" ? h(label) : <span>{label}</span>),
            default: () => {
              if (component === "input") return <ElInput placeholder="请输入" {...el} v-model={form.value[id!]} />;
              else if (component === "input-number")
                return <ElInputNumber placeholder="请输入" {...el} v-model={form.value[id!]} />;
              else if (component === "select")
                return (
                  <ElSelect placeholder="请选择" {...el} v-model={form.value[id!]}>
                    {options?.map((item) => (
                      <ElOption label={item[optionsConfig.label]} value={item[optionsConfig.value]} />
                    ))}
                  </ElSelect>
                );
              else if (component === "date")
                return (
                  <ElDatePicker
                    placeholder="请选择"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    {...el}
                    v-model={form.value[id!]}
                  />
                );
              else return <component {...el} v-model={form.value[id!]} />;
            },
          }}
        </ElFormItem>
      );
    };

    watch(
      () => content,
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

    expose({
      validate,
      resetFields,
      clearValidate,
      getFormValue,
      updateForm,
      updateValue,
    });

    return () => (
      <ElForm ref={formRef} class={ns.b()} {...elFromProps} model={form}>
        {content.map((item) => {
          const { type, items = [] } = item;
          if (type === "row" && items?.length > 0) {
            const childNode = items.map(({ span, ...child }) => <ElCol span={span}>{generate(child)}</ElCol>);
            return <ElRow>{childNode}</ElRow>;
          }
          return generate(item);
        })}
        {slots ? slots.default?.() : null}
      </ElForm>
    );
  },
});
