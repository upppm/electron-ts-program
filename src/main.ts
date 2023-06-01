import './style.css'
import App from "./App.vue";
import ElementPlus from "element-plus";
import { createApp, Directive } from "vue";


const app = createApp(App);

app.use(ElementPlus);

app.mount("#app").$nextTick(() => {
  postMessage({ payload: "removeLoading" }, "*");
});
