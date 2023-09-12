import type { ComponentResolver } from "unplugin-vue-components";

const getSideEffectsLegacy = (name: string) => {
  const partialName = name.slice(2).toLocaleLowerCase();
  return ["udesign-vue/es/components/base/style/css", `udesign-vue/es/components/${partialName}/style/css`];
};

export default function UDesignResolver(): ComponentResolver[] {
  return [
    {
      type: "component",
      resolve: (name: string) => {
        if (name.startsWith("Ul")) {
          return {
            name,
            from: "udesign-vue",
            sideEffects: getSideEffectsLegacy(name),
          };
        }
      },
    },
  ];
}
