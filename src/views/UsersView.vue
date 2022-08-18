<template>
  <LayoutAuthenticated>
    <SectionMain class="min-h-screen">
      <div v-if="userStore.users">
        <SectionTitleLineWithButton :icon="mdiAccountGroup" title="Users" main>
          <BaseButton
            :icon="mdiAccountPlus"
            label="Add New User"
            color="contrast"
            rounded-full
            small
            @click="handleUserModal"
          />
        </SectionTitleLineWithButton>
        <CardBoxUsers
          class="mb-6"
          title="Users"
          :icon="mdiAccountMultiple"
          has-table
          hoverable
          @import-excel-click="handleImportExcelClick"
        >
          <!-- <TableClients checkable /> -->
          <TableClients />
        </CardBoxUsers>
      </div>

      <div v-else>
        <SectionTitleLineWithButton :icon="mdiTableOff" title="Users" />
        <CardBoxUsers empty :header-icon-show="false" />
      </div>
      <AddUserModal
        :key="newUserModalKey"
        :isModalActive="addNewUserModal"
        @cancel="addNewUserModal = false"
      />
      <ImportExcelModal
        :isModalActive="importExcelModal"
        @cancel="importExcelModal = false"
      />
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import { ref } from "vue";
import {
  mdiAccountMultiple,
  mdiAccountGroup,
  mdiTableOff,
  mdiAccountPlus,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import TableClients from "@/components/TableClients.vue";
import CardBoxUsers from "@/components/CardBoxUsers.vue";
import AddUserModal from "@/components/AddUserModal.vue";
import ImportExcelModal from "@/components/ImportExcelModal.vue";
import BaseButton from "@/components/BaseButton.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { useUserStore } from "@/stores/user.js";

const addNewUserModal = ref(false);
const importExcelModal = ref(false);
const newUserModalKey = ref(0);
const userStore = useUserStore();

const handleImportExcelClick = () => {
  importExcelModal.value = true;
};

const handleUserModal = () => {
  addNewUserModal.value = true;
  newUserModalKey.value = Math.random();
};
</script>
