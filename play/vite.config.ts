import { defineConfig } from "vite";
import VueMacros from "unplugin-vue-macros/vite";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import resolvers from "udesign-vue/es/resolvers";

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      VueMacros({
        plugins: {
          vue: Vue(),
          vueJsx: VueJsx(),
        },
      }),
      Components({
        dts: "src/components.d.ts",
        resolvers: [
          ElementPlusResolver()
        ],
      }),
    ],
    server: {
      proxy: {
        "/hqy": {
          target: "http://192.168.210.134:26002",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/hqy/, ""),
        },
      },
    },
  };
});
