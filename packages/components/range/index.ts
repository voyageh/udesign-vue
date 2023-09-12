import { withInstall } from "@udesign-vue/utils";
import Range from "./src/range.vue";

export const UlRange = withInstall(Range);

export default UlRange;

export * from "./src/range";

export type RangeInstance = InstanceType<typeof Range>;
