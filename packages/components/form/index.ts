import { withInstall } from "@udesign-vue/utils";
import Form from "./src/form.vue";

export const UlForm = withInstall(Form);

export default UlForm;

export * from "./src/types";

export type FormInstance = InstanceType<typeof Form>;
