<template>
  <CardBoxModal v-model="isModalActive" title="Sample modal">
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <CardBoxModal
    v-model="isModalDangerActive"
    large-title="Please confirm"
    button="danger"
    has-cancel
  >
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <div v-if="checkedRows.length" class="p-3 bg-gray-100/50 dark:bg-slate-800">
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700"
    >
      {{ checkedRow.name }}
    </span>
  </div>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th />
        <th @click="sortBy('first_name')">Name</th>
        <th @click="sortBy('last_name')">Last Name</th>
        <th @click="sortBy('phone')">Phone</th>
        <th @click="sortBy('address')">Address</th>
        <th @click="sortBy('department')">Department</th>
        <th @click="sortBy('created_at')">Date</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in itemsPaginated" :key="client.id">
        <TableCheckboxCell
          v-if="checkable"
          @checked="checked($event, client)"
        />
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
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="info"
              :icon="mdiEye"
              small
              @click="isModalActive = true"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="isModalDangerActive = true"
            />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          label="<<"
          small
          :outline="styleStore.darkMode"
          @click="currentPage = 0"
          :disabled="currentPage === 0"
        />
        <BaseButton
          label="<"
          small
          :outline="styleStore.darkMode"
          @click="currentPage = currentPage - 1"
          :disabled="currentPage === 0"
        />
        <BaseButton
          active
          :label="currentPageHuman"
          small
          :outline="styleStore.darkMode"
        />
        <BaseButton
          label=">"
          small
          :outline="styleStore.darkMode"
          @click="currentPage = currentPage + 1"
          :disabled="currentPage === numPages - 1"
        />
        <BaseButton
          label=">>"
          small
          :outline="styleStore.darkMode"
          @click="currentPage = numPages - 1"
          :disabled="currentPage === numPages - 1"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useStyleStore } from "@/stores/style";
import { useUserStore } from "@/stores/user.js";
import { mdiEye, mdiTrashCan } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import { useDateFormat } from "@vueuse/core";

defineProps({
  checkable: Boolean,
});

const userStore = useUserStore();

const styleStore = useStyleStore();

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const perPage = ref(25);

const currentPage = ref(0);

const checkedRows = ref([]);

const filterParam = ref("first_name");

const filterDirection = ref(true);

const itemsPaginated = computed(() => {
  const sortedUsers = () => {
    if (filterDirection.value) {
      return userStore.users.sort((a, b) =>
        a[filterParam.value]?.toString()?.toLowerCase() >
        b[filterParam.value]?.toString()?.toLowerCase()
          ? 1
          : -1
      );
    } else {
      return userStore.users.sort((a, b) =>
        a[filterParam.value]?.toString()?.toLowerCase() <
        b[filterParam.value]?.toString()?.toLowerCase()
          ? 1
          : -1
      );
    }
  };

  return sortedUsers().slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  );
});

const numPages = computed(() =>
  Math.ceil(userStore.users.length / perPage.value)
);

const currentPageHuman = computed(() => currentPage.value + 1);

const remove = (arr, cb) => {
  const newArr = [];

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item);
    }
  });

  return newArr;
};

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client);
  } else {
    checkedRows.value = remove(
      checkedRows.value,
      (row) => row.id === client.id
    );
  }
};

const sortBy = (param) => {
  filterParam.value = param;
  filterDirection.value = !filterDirection.value;
};

const formattedDate = (date) => useDateFormat(date, "DD/MM/YY");
</script>
