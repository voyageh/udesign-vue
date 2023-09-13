import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import glob from "fast-glob";
import { rollup } from "rollup";
import esbuild from "rollup-plugin-esbuild";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/rollup";
import VueMacros from "unplugin-vue-macros/rollup";
import { buildConfig, target } from "../config/build-info";
import generateDts from "../plugins/generate-dts";
import UdesignVueAlias from "../plugins/udesign-vue-alias";
import { pkgRoot } from "../utils/paths";
import { generateExternal } from "../utils/rollup";


export const buildComponent = async () => {
  // 使用 fast-glob 查找packages/**符合指定条件的文件
  const input = await glob("**/*.{js,ts,vue}", {
    cwd: pkgRoot,
    absolute: true,
    onlyFiles: true,
    ignore: ["**/node_modules/**", "**/dist/**", "gulpfile.ts"],
  });
  const bundle = await rollup({
    input,
    plugins: [
      UdesignVueAlias(),
      VueMacros({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vue: vue(),
          vueJsx: vueJsx(),
        },
      }),
      Components({
        dts: false,
        resolvers: [ElementPlusResolver({ importStyle: false })],
      }),
      generateDts(),
      nodeResolve({
        extensions: [".mjs", ".js", ".json", ".ts"],
      }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target,
        // 当遇到.vue文件使用ts来处理
        loaders: {
          ".vue": "ts",
        },
      }),
    ],
    external: await generateExternal({ full: false }),
    // treeshake: false,
  });

  Promise.all(buildConfig.map((option) => bundle.write(option)));
};
