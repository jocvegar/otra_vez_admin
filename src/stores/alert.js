import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
  state: () => ({
    message: "HOLA!",
    display: false,
  }),
  actions: {
    toggleAlert() {
      this.display = !this.display;
    },
    closeAlert() {
      this.display = false;
    },
    setMessage(message) {
      this.message = message;
      this.display = true;
    },
  },
});
