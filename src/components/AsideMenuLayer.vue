<script setup>
import { mdiLogout, mdiClose } from "@mdi/js";
import { computed } from "vue";
import { useLayoutStore } from "@/stores/layout.js";
import { useStyleStore } from "@/stores/style.js";
import AsideMenuList from "@/components/AsideMenuList.vue";
import AsideMenuItem from "@/components/AsideMenuItem.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import { auth } from "@/firebaseConfig";
import { signOut } from "firebase/auth";
import { useMainStore } from "@/stores/main.js";
import { useRouter } from "vue-router";

defineProps({
  menu: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["menu-click"]);

const layoutStore = useLayoutStore();

const styleStore = useStyleStore();

const mainStore = useMainStore();

const router = useRouter();

const logoutItem = computed(() => ({
  label: "Logout",
  icon: mdiLogout,
  color: "info",
}));

const logoutItemClick = () => {
  signOut(auth).then(() => {
    mainStore.logOutUser();
    router.push("/login");
  });
};

const menuClick = (event, item) => {
  emit("menu-click", event, item);
};
</script>

<template>
  <aside
    id="aside"
    class="lg:py-2 lg:pl-2 w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden"
  >
    <div
      :class="styleStore.asideStyle"
      class="lg:rounded-xl flex-1 flex flex-col overflow-hidden dark:bg-slate-900"
    >
      <div
        :class="styleStore.asideBrandStyle"
        class="flex flex-row h-14 items-center justify-between dark:bg-slate-900"
      >
        <div
          class="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0"
        >
          <img
            v-if="styleStore.darkMode"
            class="h-12 w-auto mx-auto duration-300 ease-in-out hover:scale-125"
            src="../assets/images/otra_vez_blanco.png"
          />
          <img
            v-else
            class="h-10 w-auto mx-auto duration-300 ease-in-out hover:scale-125"
            src="../assets/images/logo.png"
          />
        </div>
        <button
          class="hidden lg:inline-block xl:hidden p-3"
          @click.prevent="layoutStore.isAsideLgActive = false"
        >
          <BaseIcon :path="mdiClose" />
        </button>
      </div>
      <div
        :class="
          styleStore.darkMode
            ? 'aside-scrollbars-[slate]'
            : styleStore.asideScrollbarsStyle
        "
        class="flex-1 overflow-y-auto overflow-x-hidden"
      >
        <AsideMenuList :menu="menu" @menu-click="menuClick" />
      </div>

      <ul>
        <AsideMenuItem :item="logoutItem" @menu-click="logoutItemClick" />
      </ul>
    </div>
  </aside>
</template>
