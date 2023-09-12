import type { PropType, ExtractPropTypes } from "vue";
import type { TableColumnCtx, PaginationProps as ElPaginationProps } from "element-plus";
import elTableProps from "element-plus/es/components/table/src/table/defaults";
import { IFormItem } from "@udesign-vue/components/form";

export { elTableProps };

export interface TableColumnProps<T extends any> extends Partial<TableColumnCtx<T>> {}

export interface PaginationProps extends Partial<ElPaginationProps> {
  pageKey: string;
  sizeKey: string;
}

export type DataPath = {
  listPath: string;
  totalPath: string;
};

export interface GlobalConfig extends DataPath, PaginationProps {}

export interface GlobalTableConfig extends Partial<GlobalConfig> {}

export const tableProps = {
  ...elTableProps,
  /**
   * table列
   */
  columns: {
    type: Array as PropType<TableColumnProps<any>[]>,
    required: true,
    default: () => [],
  },
  /**
   * @description 搜索表单
   */
  searchForms: {
    type: Array as PropType<IFormItem[]>,
    default: () => [],
  },
  /**
   * @description 弹窗表单
   */
  forms: {
    type: Array as PropType<IFormItem[]>,
    default: () => [],
  },
  /**
   * @description 是否有头部操作
   */
  hasOperation: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否有新增
   */
  hasNew: {
    type: Boolean,
    default: true,
  },
  newText: {
    type: String,
    default: "新增",
  },
  /**
   * @description 是否有操作列
   */
  hasOperationColumn: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 操作列列宽
   */
  columnWidth: {
    type: Number,
    default: 170,
  },
  /**
   * @description 是否有查看
   */
  hasView: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否有编辑
   */
  hasEdit: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否有删除
   */
  hasDelete: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否有分页
   * @default true
   */
  hasPaging: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 分页配置
   * @default { pageKey: 'pageNo', sizeKey: 'pageSize', background: true, small: true }
   */
  pagingConfig: Object as PropType<PaginationProps>,
  /**
   * @description 数据路径配置
   * @default { listPath: 'data', totalPath: 'total' }
   */
  dataPath: Object as PropType<DataPath>,
  /**
   * @description 获取列表数据
   */
  getList: Function as PropType<(params: any) => any>,
  /**
   * @description 查看一行数据明细，不传则从列表取
   */
  getDetail: Function as PropType<(row: any) => any>,
  /**
   * @description 点击新增
   */
  onNew: Function as PropType<() => void>,
  /**
   * @description 点击编辑
   */
  onEdit: Function as PropType<(row: any) => void>,
  editText: {
    type: String,
    default: "编辑",
  },
  /**
   * @description 点击查看
   */
  onView: Function as PropType<(row: any) => void>,
  /**
   * @description 查看按钮的文本
   */
  viewText: {
    type: String,
    default: "查看",
  },
  /**
   * @description 点击删除
   */
  onDelete: Function as PropType<(row: any) => Promise<boolean | void>>,
  deleteText: {
    type: String,
    default: "删除",
  },
  /**
   * @description 保存方法
   */
  save: Function as PropType<(params: any, type: string) => Promise<boolean | void>>,
  /**
   * @description 导出
   */
  exportFn: Function as PropType<(params: any) => Promise<any>>,
} as const;

export type TableProps = Partial<ExtractPropTypes<typeof tableProps>>;
