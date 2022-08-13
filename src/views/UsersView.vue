<template>
  <LayoutAuthenticated>
    <SectionMain class="min-h-screen">
      <div v-if="true">
        <SectionTitleLineWithButton :icon="mdiAccountGroup" title="Users" main>
          <BaseButton
            :icon="mdiAccountPlus"
            label="Add New User"
            color="contrast"
            rounded-full
            small
            @click="isModalActive = true"
          />
        </SectionTitleLineWithButton>
        <CardBox
          class="mb-6"
          title="Users"
          :icon="mdiAccountMultiple"
          has-table
          :header-icon-show="false"
        >
          <!-- <TableClients checkable /> -->
          <TableClients />
        </CardBox>
      </div>

      <div v-else>
        <SectionTitleLineWithButton :icon="mdiTableOff" title="Users" />
        <CardBox empty :header-icon-show="false" />
      </div>
      <AddUserModal
        :isModalActive="isModalActive"
        @cancel="isModalActive = false"
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
import CardBox from "@/components/CardBox.vue";
import AddUserModal from "@/components/AddUserModal.vue";
import BaseButton from "@/components/BaseButton.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";

const isModalActive = ref(false);
</script>
