<template>
  <LayoutAuthenticated>
    <SectionMain class="min-h-screen">
      <div v-if="true">
        <SectionTitleLineWithButton
          :icon="mdiAccountGroup"
          title="Users"
          main
        />
        <CardBox
          class="mb-6"
          title="Users"
          :icon="mdiAccountMultiple"
          has-table
          :header-icon-show="false"
        >
          <!-- <TableSampleClients checkable /> -->
          <TableSampleClients />
        </CardBox>
      </div>

      <div v-else>
        <SectionTitleLineWithButton :icon="mdiTableOff" title="Users" />
        <CardBox empty :header-icon-show="false" />
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import { mdiAccountMultiple, mdiAccountGroup, mdiTableOff } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import TableSampleClients from "@/components/TableSampleClients.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
</script>
