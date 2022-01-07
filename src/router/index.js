import { createRouter, createWebHistory } from "vue-router";

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
  history: createWebHistory(),
  routes,
});

export default router;
