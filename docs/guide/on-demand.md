# 快速开始

本节将介绍如何在项目中使用 `ul-business`。

# 用法

## 按需引入

利用[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components#installation)，作者也是我十分敬仰的一位大神。

```sh [npm]
$ npm install unplugin-vue-components -D
```

```sh [pnpm]
$ pnpm add unplugin-vue-components -D
```

```sh [yarn]
$ yarn add unplugin-vue-components -D
```

:::

```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import UdesignResolvers from "udesign-vue/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [UdesignResolvers()],
    }),
  ],
});
```
