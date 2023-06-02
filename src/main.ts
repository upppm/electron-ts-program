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
import './mock/index'

const app = createApp(App);

// 自定义指令
import * as directives from "@/directives";
Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});

// 全局注册`@iconify/vue`图标库
import {
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon
} from "./components/ReIcon";
app.component("IconifyIconOffline", IconifyIconOffline);
app.component("IconifyIconOnline", IconifyIconOnline);
app.component("FontIcon", FontIcon);
// 全局注册按钮级别权限组件
import { Auth } from "@/components/ReAuth";
app.component("Auth", Auth);

app.use(router);
setupStore(app);
app.use(MotionPlugin).use(ElementPlus);

app.mount("#app").$nextTick(() => {
  postMessage({ payload: "removeLoading" }, "*");
});
