import Vue from "vue";
import VueRouter from "vue-router";
const Index = () => import(/* webpackChunkName: "group-foo" */ "@/views/Index");
const Login = () => import(/* webpackChunkName: "group-foo" */ "@/views/Login");
const NotFind = () =>
  import(/* webpackChunkName: "group-foo" */ "@/views/NotFind");
const Layout = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/Layout");

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/index/base", hidden: true },
  {
    path: "/index",
    name: "主页",
    component: Layout,
    meta: {
      title: "主页",
    },
    children: [{ path: "base", name: "基础组件", component: Index }],
  },
  {
    path: "/index1",
    name: "审批",
    component: Layout,
  },
  { path: "/login", name: "登录", component: Login, hidden: true },
  { path: "/404", name: "404报错", component: NotFind, hidden: true },
  { path: "/:catchAll(.*)", redirect: "/404", hidden: true }, //TODO 无效
];

const router = new VueRouter({
  routes,
});

export default router;
