<template>
  <table>
    <thead>
      <tr>
        <th />
        <th>Name</th>
        <th>Last Name</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Department</th>
        <th>Date</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in itemsPaginated" :key="client.id">
        <td class="border-b-0 lg:w-6 before:hidden">
          <UserAvatar
            :username="client.first_name + '-' + client.last_name"
            class="w-24 h-24 mx-auto lg:w-6 lg:h-6"
          />
        </td>
        <td data-label="Name">
          {{ client.first_name }}
        </td>
        <td data-label="Last Name">
          {{ client.last_name }}
        </td>
        <td data-label="Phone">
          {{ client.phone }}
        </td>
        <td data-label="Address">
          {{ client.address }}
        </td>
        <td data-label="Department">
          {{ client.department }}
        </td>
        <td data-label="Date" class="lg:w-1 whitespace-nowrap">
          <small class="text-gray-500 dark:text-slate-400" title="Date">
            {{ formattedDate(client.created_at.toDate()) }}
          </small>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "@/stores/user.js";
import UserAvatar from "@/components/UserAvatar.vue";
import { useDateFormat } from "@vueuse/core";

const userStore = useUserStore();

const itemsPaginated = computed(() => {
  const sortedUsers = () => {
    return userStore.users.sort((a, b) =>
      a["created_at"]?.toString()?.toLowerCase() <
      b["created_at"]?.toString()?.toLowerCase()
        ? 1
        : -1
    );
  };

  return sortedUsers().slice(0, 10);
});

const formattedDate = (date) => useDateFormat(date, "DD/MM/YY");
</script>
