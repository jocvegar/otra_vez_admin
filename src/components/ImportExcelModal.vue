<template>
  <SectionMain>
    <CardBoxModal
      v-model="isModalActive"
      title="Excel Import"
      has-cancel
      @cancel="handleCancel"
      @confirm="handleConfirm"
    >
      <NotificationBarInCard
        v-if="notification.formStatusShow"
        :color="notification.formStatusColor"
        :is-placed-with-header="true"
      >
        <span>
          <b class="capitalize">{{ notification.formStatusLabel }} </b>
        </span>
      </NotificationBarInCard>
      <FormFilePicker
        v-model="customElementsForm.file"
        @change="readFile"
        accept=".xlsx, .xls"
      />
    </CardBoxModal>
  </SectionMain>
</template>

<script setup>
import CardBoxModal from "@/components/CardBoxModal.vue";
import SectionMain from "@/components/SectionMain.vue";
import NotificationBarInCard from "@/components/NotificationBarInCard.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import { reactive } from "vue";
import readXlsxFile from "read-excel-file";
import { useUsers } from "@/services/user.service";

defineProps({
  isModalActive: Boolean,
});

const emit = defineEmits(["cancel"]);

const customElementsForm = reactive({
  file: null,
});

const notification = reactive({
  formStatusShow: false,
  formStatusLabel: "",
  formStatusColor: null,
});

const { addUser } = useUsers();

const handleCancel = () => {
  emit("cancel");
  customElementsForm.file = null;
};

const handleConfirm = () => {
  emit("cancel");
  customElementsForm.file = null;
};

const readFile = async () => {
  notification.formStatusShow = true;
  notification.formStatusLabel = "Reading file...";
  notification.formStatusColor = "info";

  await readXlsxFile(customElementsForm.file).then((rows) => {
    rows.slice(1).forEach(async (row) => {
      const user = {
        first_name: row[0],
        last_name: row[1],
        phone: row[2],
        address: row[3],
        department: row[4],
        created_at: row[5],
      };
      await addUser(user);
    });
  });

  notification.formStatusShow = true;
  notification.formStatusLabel = "Success";
  notification.formStatusColor = "sucess";
};
</script>
