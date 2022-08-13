<template>
  <CardBoxModal
    v-model="isModalActive"
    title="Add New User"
    has-cancel
    @cancel="handleCancel"
    @confirm="handleConfirm"
  >
    Aca va la form isModalActive
  </CardBoxModal>
</template>

<script setup>
import CardBoxModal from "@/components/CardBoxModal.vue";

defineProps({
  isModalActive: Boolean,
});

const emit = defineEmits(["cancel"]);

const handleCancel = () => {
  emit("cancel");
};

const handleConfirm = () => {
  emit("cancel");
};
</script>
