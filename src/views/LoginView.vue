<script setup>
import { useRouter } from "vue-router";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import SectionMain from "@/components/SectionMain.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import { useMainStore } from "@/stores/main";
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

console.log("mainStore", mainStore);
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
    mainStore.setUser2(payload.user);
    router.push("/");
    console.log("payload", payload);
  } catch (error) {
    alert(error.message);
  }
};
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <SectionMain>
        <CardBox class="md:w-7/12 lg:w-5/12 xl:w-4/12 shadow-2xl md:mx-auto">
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
        </CardBox>
      </SectionMain>
    </SectionFullScreen>
  </LayoutGuest>
</template>
