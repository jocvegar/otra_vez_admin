import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";

const routes = [
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: "Dashboard",
      requiresAuth: true,
      showSearch: false,
    },
    path: "/",
    name: "dashboard",
    component: Home,
  },
  {
    meta: {
      title: "Users",
      requiresAuth: true,
      showSearch: true,
    },
    path: "/users",
    name: "users",
    component: () => import("@/views/UsersView.vue"),
  },
  // {
  //   meta: {
  //     title: "Tables",
  //     requiresAuth: true,
  //   },
  //   path: "/tables",
  //   name: "tables",
  //   component: () => import("@/views/TablesView.vue"),
  // },
  // {
  //   meta: {
  //     title: "Forms",
  //   },
  //   path: "/forms",
  //   name: "forms",
  //   component: () => import("@/views/FormsView.vue"),
  // },
  {
    meta: {
      title: "Profile",
      requiresAuth: true,
      showSearch: false,
    },
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
  },
  // {
  //   meta: {
  //     title: "Ui",
  //   },
  //   path: "/ui",
  //   name: "ui",
  //   component: () => import("@/views/UiView.vue"),
  // },
  // {
  //   meta: {
  //     title: "Responsive layout",
  //   },
  //   path: "/responsive",
  //   name: "responsive",
  //   component: () => import("@/views/ResponsiveView.vue"),
  // },
  {
    meta: {
      title: "Login",
    },
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  // {
  //   meta: {
  //     title: "Error",
  //   },
  //   path: "/error",
  //   name: "error",
  //   component: () => import("@/views/ErrorView.vue"),
  // },
  {
    // path: "*",
    path: "/:catchAll(.*)",
    name: "Error",
    component: () => import("@/views/ErrorView.vue"),
    meta: {
      requiresAuth: false,
      title: "Error",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export default router;
