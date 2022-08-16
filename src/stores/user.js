import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
  }),
  getters: {
    usersCount: (state) => state.users.length,
  },
  actions: {
    setUsers(users) {
      this.users = users;
    },
  },
});
