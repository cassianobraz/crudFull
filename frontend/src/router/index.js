import { createRouter, createWebHistory } from "vue-router";
import Home from "../view/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
