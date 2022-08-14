<template>
  <component
    :is="is"
    :class="componentClass"
    class="bg-white flex flex-col"
    @submit="submit"
  >
    <header
      v-if="title"
      class="flex items-stretch border-b border-gray-100 dark:border-slate-800"
    >
      <div
        class="flex items-center py-3 grow font-bold"
        :class="[icon ? 'px-4' : 'px-6']"
      >
        <BaseIcon v-if="icon" :path="icon" class="mr-3" />
        {{ title }}
      </div>
      <div class="dropdown dropdown-end">
        <label tabindex="0">
          <button
            v-if="headerIconShow"
            class="flex items-center py-3 px-4 justify-centerfocus:ring"
            @click="headerIconClick"
          >
            <BaseIcon :path="computedHeaderIcon" />
          </button>
        </label>
        <ul
          v-on-click-outside="closeDropDown"
          v-if="showDropDown"
          tabindex="0"
          class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li @click="importExcelClick"><a>Excel Import</a></li>
        </ul>
      </div>
    </header>
    <div
      v-if="empty"
      class="text-center py-24 text-gray-500 dark:text-slate-400"
    >
      <p>Nothing's here…</p>
    </div>
    <div v-else class="flex-1" :class="{ 'p-6': !hasTable }">
      <slot />
    </div>
    <div
      v-if="footer"
      class="p-6 border-t border-gray-100 dark:border-slate-800"
    >
      <slot name="footer" />
    </div>
  </component>
</template>

<script setup>
import { mdiCog } from "@mdi/js";
import { computed, useSlots, ref } from "vue";
import BaseIcon from "@/components/BaseIcon.vue";
import { vOnClickOutside } from "@vueuse/components";

const props = defineProps({
  title: {
    type: String,
    default: null,
  },
  icon: {
    type: String,
    default: null,
  },
  headerIcon: {
    type: String,
    default: null,
  },
  headerIconShow: {
    type: Boolean,
    default: true,
  },
  rounded: {
    type: String,
    default: "rounded-xl",
  },
  hasTable: Boolean,
  empty: Boolean,
  form: Boolean,
  hoverable: Boolean,
  modal: Boolean,
});

const emit = defineEmits(["header-icon-click", "submit", "import-excel-click"]);

const is = computed(() => (props.form ? "form" : "div"));

const slots = useSlots();

const footer = computed(() => slots.footer && !!slots.footer());

const componentClass = computed(() => {
  const base = [
    props.rounded,
    props.modal ? "dark:bg-slate-900" : "dark:bg-slate-900/70",
  ];

  if (props.hoverable) {
    base.push("hover:shadow-lg transition-shadow duration-500");
  }

  return base;
});

const computedHeaderIcon = computed(() => props.headerIcon ?? mdiCog);

const headerIconClick = () => {
  emit("header-icon-click");
  showDropDown.value = !showDropDown.value;
};

const submit = (e) => {
  emit("submit", e);
};

const showDropDown = ref(false);

const closeDropDown = () => {
  showDropDown.value = false;
};

const importExcelClick = () => {
  showDropDown.value = false;
  emit("import-excel-click");
};
</script>
