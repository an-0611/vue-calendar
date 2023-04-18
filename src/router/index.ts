import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "ProductList",
    component: () => import("../views/ProductList.vue"),
  },
  {
    path: "/items/:id",
    name: "ProductDetail",
    component: () => import("../views/ProductDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
