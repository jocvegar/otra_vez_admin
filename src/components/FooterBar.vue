<script setup>
import { computed } from "vue";
import { containerMaxW } from "@/config.js";
import BaseLevel from "@/components/BaseLevel.vue";
import { useStyleStore } from "@/stores/style.js";

const styleStore = useStyleStore();
const year = computed(() => new Date().getFullYear());
</script>

<template>
  <footer class="py-2 px-6">
    <BaseLevel :class="containerMaxW">
      <div class="text-center md:text-left">
        <b>
          &copy;{{ year }} |
          <a href="https://www.otravez.shop/" target="_blank">otravez.shop</a>
        </b>
        Encuentra Tu Estilo
        <span class="text-black-600 font-bold"> Otra Vez </span>
      </div>
      <div class="md:py-2">
        <a href="https://www.otravez.shop/">
          <img
            v-if="styleStore.darkMode"
            class="h-8 w-auto mx-auto duration-300 ease-in-out hover:scale-125"
            src="../assets/images/otra_vez_blanco.png"
          />
          <img
            v-else
            class="h-6 w-auto mx-auto duration-300 ease-in-out hover:scale-125"
            src="../assets/images/logo.png"
          />
        </a>
      </div>
    </BaseLevel>
  </footer>
</template>
