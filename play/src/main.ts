import { createApp } from "vue";
import App from "./App.vue";
import { GlobalTableConfig } from "@udesign-vue/components";

const app = createApp(App);

app.provide<GlobalTableConfig>("table", {
  listPath: "list",
});
app.mount("#app");
