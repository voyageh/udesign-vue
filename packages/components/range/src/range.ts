import type { ExtractPropTypes } from "vue";

export const rangeProps = {
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  /**
   * @description min key
   */
  minKey: {
    type: String,
    default: "min",
  },
  /**
   * @description max key
   */
  maxKey: {
    type: String,
    default: "max",
  },
  /**
   * @description 分隔符
   */
  rangeSeparator: {
    type: String,
    default: "-",
  },
  /**
   * 组件
   */
  component: {
    type: [String, Object],
    required: true,
    default: "el-range",
  },
  startPlaceholder: String,
  endPlaceholder: String,
};

export type RangeProps = Partial<ExtractPropTypes<typeof rangeProps>>;
