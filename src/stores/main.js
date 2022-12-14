import { defineStore } from "pinia";
import axios from "axios";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export const useMainStore = defineStore("main", {
  state: () => ({
    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,
    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false,
    searchValue: "",
    /* Sample data (commonly used) */
    clients: [],
    history: [],
  }),
  actions: {
    setUser(payload) {
      this.userName = payload.displayName ?? "Chelon";
      this.userEmail = payload.email ?? "info.otravez@gmail.com";
      this.userAvatar =
        payload.auth.currentUser.photoURL ??
        "https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93";
    },
    logOutUser() {
      this.userName = null;
      this.userEmail = null;
      this.userAvatar = null;
    },
    fetchUser() {
      onAuthStateChanged(auth, (user) => {
        user === null ? this.logOutUser() : this.setUser(user);
      });
    },
    setSearchValue(payload) {
      this.searchValue = payload;
    },
    resetSearchValue() {
      this.searchValue = "";
    },
    fetch(sampleDataKey) {
      axios
        .get(`data-sources/${sampleDataKey}.json`)
        .then((r) => {
          if (r.data && r.data.data) {
            this[sampleDataKey] = r.data.data;
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
});
