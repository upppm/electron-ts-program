import App from "./App.vue";
import ElementPlus from "element-plus";
import { createApp, Directive } from "vue";
import router from "./router";
import { setupStore } from "@/store";
import { MotionPlugin } from "@vueuse/motion";
import "element-plus/dist/index.css";
import  "@/types/global.d.ts"
// 导入公共样式
import "./style/index.scss";
// 引入重置样式
import "./style/reset.scss";

const app = createApp(App);
app.use(router);
setupStore(app);
app.use(MotionPlugin).use(ElementPlus);

app.mount("#app").$nextTick(() => {
  postMessage({ payload: "removeLoading" }, "*");
});
