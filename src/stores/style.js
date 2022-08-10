import { defineStore } from "pinia";
// import * as styles from "@/styles";
import { white as styleDefault } from "@/styles.js";
// import { darkModeKey, styleKey } from "@/config";
import { darkModeKey } from "@/config";

export const useStyleStore = defineStore("style", {
  state: () => ({
    /* Styles */
    asideStyle: "",
    asideBrandStyle: "",
    asideMenuItemStyle: "",
    asideMenuItemActiveStyle: "",
    asideMenuDropdownStyle: "",
    navBarItemLabelStyle: "",
    navBarItemLabelHoverStyle: "",
    navBarItemLabelActiveColorStyle: "",
    navBarMenuListUpperLabelStyle: "",
    overlayStyle: "",
    /* Dark mode */
    darkMode: false,
  }),
  actions: {
    // setStyle(payload) {
    setStyle() {
      // if (!styles[payload]) return;

      // if (typeof localStorage !== "undefined") {
      //   localStorage.setItem(styleKey, payload);
      // }

      // const style = styles[payload];

      for (const key in styleDefault) {
        this[`${key}Style`] = style[key];
      }
    },

    setDarkMode(payload = null) {
      this.darkMode = payload !== null ? payload : !this.darkMode;

      if (typeof localStorage !== "undefined") {
        localStorage.setItem(darkModeKey, this.darkMode ? "1" : "0");
      }

      if (typeof document !== "undefined") {
        document.documentElement.classList[this.darkMode ? "add" : "remove"](
          "dark-scrollbars"
        );
      }
    },
  },
});
