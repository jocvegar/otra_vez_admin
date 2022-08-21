<script setup>
import { ref, watch } from "vue";
import FormControl from "@/components/FormControl.vue";
import { useRouter } from "vue-router";
import { useMainStore } from "@/stores/main";

const router = useRouter();
const showNav = ref(false);
const mainStore = useMainStore();

watch(
  router.currentRoute,
  () => {
    router.currentRoute.value.meta.showSearch
      ? (showNav.value = true)
      : (showNav.value = false);
  },
  { immediate: true }
);

const handleInputChange = (value) => {
  mainStore.setSearchValue(value);
};
</script>

<template>
  <FormControl
    v-if="showNav"
    ref="root"
    placeholder="Search (ctrl+k)"
    ctrl-k-focus
    transparent
    borderless
    @update:modelValue="handleInputChange"
  />
</template>
