import { withInstall } from "@udesign-vue/utils";
import Table from "./src/table.vue";

export const UlTable = withInstall(Table);

export default UlTable;

export * from "./src/table";

export type TableInstance = InstanceType<typeof Table>;
