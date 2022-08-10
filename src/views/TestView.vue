<template>
  <div>
    <!-- <AsideMenu /> -->
    <AsideMenuItem :item="{ id: 1, color: 'red' }" />
  </div>
</template>

<script setup>
import AsideMenu from "@/components/AsideMenu.vue";
import AsideMenuItem from "@/components/AsideMenuItem.vue";
</script>

<style scoped></style>
