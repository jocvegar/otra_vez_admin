<template>
  <CarBoxAddUserModal
    v-model="isModalActive"
    title="Edit User"
    has-cancel
    @cancel="handleCancel"
    @submit="handleSubmit"
  >
    <FormField label="Name">
      <FormControl
        v-model="form.first_name"
        :icon="mdiAccount"
        name="first_name"
        placeholder="Johnny"
        required
        ctrlKFocus
      />
      <FormControl
        v-model="form.last_name"
        :icon="mdiAccount"
        name="last_name"
        placeholder="Knoxville"
        required
      />
    </FormField>
    <FormField label="Address" help="Short description will do">
      <FormControl
        v-model="form.address"
        :icon="mdiMapMarker"
        name="address"
        required
      />
    </FormField>
    <FormField label="Department & Phone">
      <FormControl
        v-model="form.department"
        :options="selectOptions"
        required
      />
      <FormControl
        v-model="form.phone"
        :icon="mdiCellphone"
        type="tel"
        name="phone"
        required
      />
    </FormField>
    <BaseDivider />
  </CarBoxAddUserModal>
</template>

<script setup>
import { reactive } from "vue";
import { mdiCellphone, mdiAccount, mdiMapMarker } from "@mdi/js";
import { useUsers } from "@/services/user.service";
import { useAlertStore } from "@/stores/alert";
import CarBoxAddUserModal from "@/components/CarBoxAddUserModal.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseDivider from "@/components/BaseDivider.vue";

const props = defineProps({
  isModalActive: Boolean,
  client: {
    type: Object,
  },
});

const alertStore = useAlertStore();

const { updateUser } = useUsers();

const selectOptions = [
  { id: 1, label: "Atlántida" },
  { id: 2, label: "Choluteca" },
  { id: 3, label: "Colón" },
  { id: 4, label: "Comayagua" },
  { id: 5, label: "Copán" },
  { id: 6, label: "Cortés" },
  { id: 7, label: "El Paraíso" },
  { id: 8, label: "Francisco Morazán" },
  { id: 9, label: "Gracias a Dios" },
  { id: 10, label: "Intibucá" },
  { id: 11, label: "Islas de la Bahía" },
  { id: 12, label: "La Paz" },
  { id: 13, label: "Lempira" },
  { id: 14, label: "Ocotepeque" },
  { id: 15, label: "Olancho" },
  { id: 16, label: "Santa Bárbara" },
  { id: 17, label: "Valle" },
  { id: 18, label: "Yoro" },
];

const form = reactive({
  first_name: props?.client?.first_name,
  last_name: props?.client?.last_name,
  phone: props?.client?.phone,
  address: props?.client?.address,
  department: selectOptions.filter(
    (o) => o["label"] === props?.client?.department
  )[0],
});

const emit = defineEmits(["cancel"]);

const handleCancel = () => {
  emit("cancel");
};

const handleSubmit = async () => {
  const userData = {
    id: props?.client?.id,
    first_name: form.first_name,
    last_name: form.last_name,
    phone: form.phone,
    address: form.address,
    department: form.department.label,
  };

  try {
    await updateUser(userData);
    emit("cancel");
    alertStore.setMessage("User updated successfully");
  } catch (error) {
    alertStore.setMessage(error);
  }
};
</script>
