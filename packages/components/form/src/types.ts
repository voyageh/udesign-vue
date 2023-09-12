import { PropType, ExtractPropTypes, VNode } from "vue";
import type { FormItemProps } from "element-plus";
import { formProps as elFormProps } from "element-plus";

export type OptionsConfig = {
  label: string;
  value: string;
};

export interface IFormItem extends Partial<Omit<FormItemProps, "label" | "prop">> {
  id?: string;
  /**
   * @description 可以是文字也可以是组件
   */
  label?: string | (() => object | VNode);
  /**
   * @description 可以是组件名字，也可以是组件对象
   */
  component?: string | object;
  /**
   * @description el-option
   */
  options?: Record<string, any>[];
  /**
   * @description el-option 配置
   * @default { label: 'label', value: 'value' }
   */
  optionsConfig?: OptionsConfig;
  /**
   * @description 默认值
   */
  default?: any;
  /**
   * @description 组件属性
   */
  el?: object;
  /**
   * @description 珊格布局
   */
  type?: "row";
  /**
   * @description el-col span
   */
  span?: number;
  /**
   * @description 珊格布局
   */
  items?: IFormItem[];
}

export const formProps = {
  ...elFormProps,
  content: {
    type: Array as PropType<IFormItem[]>,
    default: () => [],
  },
  modelValue: Object,
};

export const formItemProps = {
  prop: {
    type: Object as PropType<IFormItem>,
    required: true,
    default: () => ({}),
  },
  modelValue: [String, Number, Boolean, Array] as PropType<any>,
};

export type UlFormProps = ExtractPropTypes<typeof formProps>;
