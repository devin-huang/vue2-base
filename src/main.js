import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/style/common.scss";
import BaseTable from "@/components/baseTable";
import Fragment from "vue-fragment";

Vue.component(BaseTable.name, BaseTable);
Vue.config.productionTip = false;
Vue.use(ElementUI, { size: "mini" });
Vue.use(Fragment.Plugin);
Vue.prototype.$vm = this;

const vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

window.$h = vm.$createElement;
