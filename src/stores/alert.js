import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
  state: () => ({
    message: "HOLA!",
    display: false,
  }),
  actions: {
    closeAlert() {
      this.display = false;
    },
    setMessage(message) {
      this.message = message;
      this.display = true;
      setTimeout(() => {
        this.message = "";
        this.display = false;
      }, "3500");
    },
  },
});
