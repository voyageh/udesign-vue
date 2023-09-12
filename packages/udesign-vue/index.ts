export * from "@udesign-vue/components";
export * from "@udesign-vue/utils";
export * from "@udesign-vue/hooks";

import { makeInstaller } from "./make-installer";
import components from "./component";
export default makeInstaller(components);
