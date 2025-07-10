import { createRouter, createWebHistory } from "vue-router";
import Main from "../Views/Main.vue";
import Messages from "../Views/Messages.vue";
import NotFoundView from "../Views/NotFoundView.vue";
import Create from "../Views/Create.vue";
const routes = [
  { path: "/", name: "create", component: Create },
  { path: "/main", name: "home", component: Main },
  { path: "/messages", name: "messages", component: Messages },
  // with hash, resulting in /about#team

  {
    path: "/:catchAll(.*)",
    name: "not-found",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
    return { top: 0 };
  },
});

export default router;
