// import { from } from "core-js/core/array";
import { createRouter, createWebHashHistory } from "vue-router";
import store from "@/store/index.js";

const routes = [
  {
    path: "/",
    name: "welcome",
    component: () => import("../views/WelcomePage.vue"),
  },
  {
    path: "/colors",
    name: "colors",
    component: () => import("../views/Colors.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  let source = store.state.path;
  if (!source && to.path == "/colors") {
    return "/";
  }
});

export default router;
