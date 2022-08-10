import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { useMainStore } from "@/stores/main.js";
import { useStyleStore } from "@/stores/style.js";
import { useLayoutStore } from "@/stores/layout.js";
import { darkModeKey, styleKey } from "@/config.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig.js";
import "./css/main.css";

/* Init Pinia */
const pinia = createPinia();

/* Create Vue app */
createApp(App).use(router).use(pinia).mount("#app");

/* Init Pinia stores */
const mainStore = useMainStore(pinia);
const styleStore = useStyleStore(pinia);
const layoutStore = useLayoutStore(pinia);

/* Fetch sample data */
mainStore.fetch("clients");
mainStore.fetch("history");

/* App style */
styleStore.setStyle(localStorage[styleKey] ?? "basic");

/* Dark mode */
if (
  (!localStorage[darkModeKey] &&
    window.matchMedia("(prefers-color-scheme: dark)").matches) ||
  localStorage[darkModeKey] === "1"
) {
  styleStore.setDarkMode(true);
}

/* Default title tag */
const defaultDocumentTitle = "Otra Vez";

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(auth, (user) => {
      removeListener();
      resolve(user), reject;
    });
  });
};
/* Collapse mobile aside menu on route change */
router.beforeEach(async (to, from, next) => {
  layoutStore.isAsideMobileExpanded = false;
  layoutStore.isAsideLgActive = false;

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !(await getCurrentUser())) {
    next({ path: "/login" });
  } else if ((await getCurrentUser()) && to.path === "/login") {
    next({ path: "/" });
  } else {
    next();
  }
});

router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle;
});
