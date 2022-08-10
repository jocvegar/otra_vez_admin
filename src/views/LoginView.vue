<script setup>
import { useRouter } from "vue-router";
import { useMainStore } from "@/stores/main";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import BaseButton from "@/components/BaseButton.vue";
import SectionMain from "@/components/SectionMain.vue";
import { mdiGoogle } from "@mdi/js";
import { auth } from "../firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  useDeviceLanguage,
} from "firebase/auth";

const router = useRouter();
const mainStore = useMainStore();

const login = async () => {
  const re = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isMobile = re.test(navigator.userAgent);

  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/plus.login");
  useDeviceLanguage(auth);
  let payload;
  try {
    if (isMobile) {
      payload = await signInWithRedirect(auth, provider);
    } else {
      payload = await signInWithPopup(auth, provider);
    }

    const isNewUser = payload._tokenResponse.isNewUser;

    if (isNewUser) {
      payload.user.delete();
      console.log("sin Acceso");
    } else {
      mainStore.setUser2(payload.user);
      router.push("/");
    }
  } catch (error) {
    console.log(`error`, error);
  }
};
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <SectionMain>
        <img
          class="h-32 w-auto mx-auto duration-300 ease-in-out animate-pulse mb-10"
          src="../assets/images/otra_vez_blanco.png"
        />
        <div
          class="text-center py-24 lg:py-12 text-gray-500 dark:text-slate-400"
        >
          <BaseButton
            :icon="mdiGoogle"
            label="login"
            color="contrast"
            @click="login"
          />
        </div>
      </SectionMain>
    </SectionFullScreen>
  </LayoutGuest>
</template>
