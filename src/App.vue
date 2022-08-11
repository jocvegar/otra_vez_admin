<script setup>
import { RouterView } from "vue-router";
import { useMainStore } from "@/stores/main.js";
import { onBeforeMount } from "vue";

onBeforeMount(() => {
  useMainStore().fetchUser();
});
</script>

<template>
  <RouterView />
</template>
