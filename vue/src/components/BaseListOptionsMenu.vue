<script
  setup
  lang="ts"
>
import { ref, toRaw, watchEffect } from 'vue';
import { storeToRefs } from "pinia";
import { useEventListener } from "@vueuse/core";
import { useListsStore } from "@/stores/lists";

const { elementId, elementType, handleCreateCard } = defineProps<{
  elementId: string;
  elementType: 'card' | 'list';
  handleCreateCard: () => void;
}>();

const store = useListsStore();
const { listsArray } = storeToRefs(store);

const isMenuVisible = ref<boolean>(false);

function toggleIsMenuVisible() { isMenuVisible.value = !isMenuVisible.value; }

let cleanup: any = null;

watchEffect(() => {
  if (isMenuVisible.value) {
    setTimeout(() => {
      cleanup = useEventListener(window, 'click', () => {
        isMenuVisible.value = false;
      });
    }, 500);
  }
});

watchEffect(() => {
  if (!isMenuVisible.value && cleanup) cleanup();
});

async function handleDeleteList() {
  if (elementType === 'list') {
    store.updateLists(toRaw(listsArray.value).filter((item) => item.id !== elementId));
  }
}

const ACTIONS = [
  { title: 'Create Card', func: handleCreateCard },
  { title: 'Delete', func: handleDeleteList },
];
</script>

<template>
  <section>
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
  </section>
</template>
