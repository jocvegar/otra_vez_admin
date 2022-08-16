<script setup>
import { RouterView } from "vue-router";
import { useMainStore } from "@/stores/main.js";
import { useUserStore } from "@/stores/user.js";
import { onBeforeMount } from "vue";
import { useUsers } from "@/services/user.service";

const { users, getAllUsers } = useUsers();

const userStore = useUserStore();

onBeforeMount(() => {
  useMainStore().fetchUser();

  if (userStore.users.length === 0) {
    getAllUsers();
    userStore.setUsers(users);
  }
});
</script>

<template>
  <RouterView />
</template>
