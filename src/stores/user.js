import { defineStore } from "pinia";
import _groupBy from "lodash/groupBy";
import _max from "lodash/max";
import _findKey from "lodash/findKey";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
  }),
  getters: {
    usersCount: (state) => state.users.length,
    departmentMostUsers: (state) => {
      const groupBy = _groupBy(state.users, "department");
      const values = Object.values(groupBy);
      const maxCount = _max(values)?.length;
      const key = _findKey(groupBy, (o) => o.length >= maxCount);

      return { department: key, count: maxCount };
    },
  },
  actions: {
    setUsers(users) {
      this.users = users;
    },
  },
});
