<script
  setup
  lang="ts"
>
import { onMounted, ref, toRaw, watchEffect } from 'vue';
import type { ListType } from "@/App.vue";
import localforage from "localforage";
import { useEventListener } from "@vueuse/core";

const { elementId, elementType, list, refresh, handleCreateCard } = defineProps<{
  elementId: string;
  elementType: 'card' | 'list';
  list: ListType[];
  refresh: () => void;
  handleCreateCard: () => void;
}>();

const isMenuVisible = ref<boolean>(false);

function toggleIsMenuVisible() { isMenuVisible.value = !isMenuVisible.value; }

async function handleDeleteList() {
  if (elementType === 'list') {
    const newList = await localforage.setItem('lists', toRaw(list).filter((item) => item.id !== elementId));
    if (newList) refresh();
  }
}

const ACTIONS = [
  { title: 'Create Card', func: handleCreateCard },
  { title: 'Delete', func: handleDeleteList },
];
</script>

<template>
  <button
    class="absolute right-0 top-0 w-8 h-8"
    @click="toggleIsMenuVisible"
    type="button"
  >
    <strong>⋮</strong>
  </button>
  <template v-if="isMenuVisible">
    <ul class="options-menu">
      <li
        class="dark:bg-slate-600 dark:hover:bg-slate-500 hover:bg-slate-100"
        v-for="action in ACTIONS"
        :key="action.title"
      >
        <button
          @click="action.func"
          class="p-2 w-full"
          type="button"
        >
          {{ action.title }}
        </button>
      </li>
    </ul>
  </template>
</template>
