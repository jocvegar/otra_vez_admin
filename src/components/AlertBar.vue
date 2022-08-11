<template>
  <Transition>
    <div
      v-if="alertStore.display"
      class="alert alert-warning shadow-lg md:container mx-auto absolute top-0 left-0 right-0 mt-12 z-40"
    >
      <div>
        <BaseIcon :path="mdiAlertCircle" size="32" />
        <span>{{ alertStore.message }}</span>
      </div>
      <div class="flex-none">
        <button class="btn btn-sm btn-ghost" @click="alertStore.closeAlert()">
          Close
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useAlertStore } from "@/stores/alert.js";
import { mdiAlertCircle } from "@mdi/js";
import BaseIcon from "@/components/BaseIcon.vue";
import { onMounted } from "vue";

const alertStore = useAlertStore();

onMounted(() => {
  console.log("aca");
  setTimeout(() => {
    alertStore.closeAlert();
  }, "100");
});
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
