import { createApp } from "vue";
import App from "./App.vue";
import 'udesign-vue/es/style'
import { GlobalTableConfig } from "@udesign-vue/components";

const app = createApp(App);

app.provide<GlobalTableConfig>("table", {
  listPath: "list",
});
app.mount("#app");
