# 快速开始

本节将介绍如何在项目中使用 `ul-business`。

# 用法

## 引入

```ts
// main.ts
import { createApp } from "vue";
import uDesign from "udesign-vue";
import "udesign-vue/es/style";
import App from "./App.vue";

const app = createApp(App);

app.use(uDesign);
app.mount("#app");
```
