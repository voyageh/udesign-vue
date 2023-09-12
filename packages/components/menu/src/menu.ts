import type { PropType, ExtractPropTypes } from "vue";
import { menuProps as elMenuProps } from "element-plus";

export type Meta = {
  icon?: any;
};

export interface IMenuItem<TMata = any> {
  id: string;
  name: string;
  path: string;
  meta: Meta & TMata;
  children?: IMenuItem<TMata>[];
}

export const menuItemProps = {
  menu: {
    type: Object as PropType<IMenuItem>,
    required: true,
    default: () => ({}),
  },
  parent: {
    type: String,
    default: "",
  },
};

export const menuProps = {
  ...elMenuProps,
  menus: {
    type: Array as PropType<IMenuItem[]>,
  },
  /**
   * @description 选中的背景色
   */
  selectBgColor: String,
  /**
   * @description 菜单宽度
   */
  width: {
    type: String,
    default: "200px",
  },
};

export type MenuItemProps = ExtractPropTypes<typeof menuItemProps>;
export type MenuProps = ExtractPropTypes<typeof menuProps>;
