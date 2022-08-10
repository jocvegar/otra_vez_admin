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
    user2Name: null,
    user2Email: null,
    user2Avatar: null,
    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false,
    /* Sample data (commonly used) */
    clients: [],
    history: [],
  }),
  actions: {
    setUser(payload) {
      if (payload.name) {
        this.userName = payload.name;
      }
      if (payload.email) {
        this.userEmail = payload.email;
      }
      if (payload.avatar) {
        this.userAvatar = payload.avatar;
      }
    },
    setUser2(payload) {
      if (payload.displayName) this.user2Name = payload.displayName;
      if (payload.email) this.user2Email = payload.email;
      if (payload.photoURL) this.user2Avatar = payload.photoURL;
    },
    logOutUser() {
      this.user2Name = null;
      this.user2Email = null;
      this.user2Avatar = null;
    },
    fetchUser() {
      onAuthStateChanged(auth, (user) => {
        if (user === null) {
          this.logOutUser();
        } else {
          this.setUser2(user);
        }
      });
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
