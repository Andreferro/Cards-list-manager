<script
  setup
  lang="ts"
>
import { onBeforeMount, onMounted, ref, toRaw } from "vue";
import BaseInput from './BaseInput.vue';
import { useRoute, useRouter } from "vue-router";
import type { ListType } from "@/App.vue";
import { useListsStore } from "@/stores/lists";
import { storeToRefs } from "pinia";
import localforage from "localforage";

const store = useListsStore();
const { listsArray } = storeToRefs(store);

const dialogElement = ref();
const router = useRouter();
const route = useRoute();

const { listId, cardId } = route.params as { listId: string, cardId: string };

const objectIndexes = ref<[number?, number?]>([undefined, undefined]);
const title = ref('');
const description = ref('');

function closeModal() {
  router.push('/');
}

async function loadData() {
  if (!listId || !cardId) {
    closeModal();
    return;
  }

  const lists: ListType[] = await localforage.getItem('lists') || [];
  // Since the data is structured as an array of cards inside an array of list objects,
  // first find the corresponding list and the the card using the ids provided
  const listIndex = lists.findIndex((list) => list.id === listId);
  if (listIndex === -1) {
    // closeModal();
    return;
  }

  let cardIndex = -1;
  const card = lists[listIndex].cards.find((c, i) => {
    cardIndex = i;
    return c.id === cardId;
  });
  if (card) {
    objectIndexes.value = [listIndex, cardIndex];
    title.value = card.title;
    description.value = card.description;
    return;
  }
  closeModal();
}

async function deleteCard() {
  if (typeof objectIndexes.value[0] !== 'number' || typeof objectIndexes.value[1] !== 'number') return;
  const lists: ListType[] = toRaw(listsArray.value);

  lists[objectIndexes.value[0]].cards.splice(objectIndexes.value[1], 1);
  store.updateLists(lists);
  closeModal();
}

async function saveContent(newValue: string, field: 'title' | 'description') {
  if (!cardId) return;
  if (typeof objectIndexes.value[0] !== 'number' || typeof objectIndexes.value[1] !== 'number') return;

  const lists: ListType[] = toRaw(listsArray.value);
  lists[objectIndexes.value[0]].cards[objectIndexes.value[1]] = {
    id: cardId,
    title: field === 'title' ? newValue : title.value,
    description: field === 'description' ? newValue : title.value,
  };
  store.updateLists(lists);
}

onBeforeMount(() => {
  loadData();
});

onMounted(() => {
  dialogElement.value.showModal();
});
</script>
<template>
  <dialog
    ref="dialogElement"
    class="bg-transparent p-0 outline-none"
    @click="closeModal"
    role="presentation"
  >
    <section
      class="rounded border-none bg-white dark:bg-sky-950 outline-none p-5 max-w-3xl min-w-[20rem] md:min-w-[50rem]"
      @click.stop="() => { }"
      role="presentation"
      v-if="typeof objectIndexes[1] === 'number'"
    >
      <header>
        <h1>
          <strong>
            <BaseInput
              :initialValue="title"
              placeholder="Card title"
              :onSubmit="(newTitle: string) => saveContent(newTitle, 'title')"
            />
          </strong>
        </h1>
        <button
          class="absolute right-5 top-5 px-1 dark:text-white"
          @click="closeModal"
          type="button"
        >
          <strong>X</strong>
        </button>
      </header>
      <div class="my-5">
        <BaseInput
          :initialValue="description"
          placeholder="Card description"
          :onSubmit="(newDescription: string) => saveContent(newDescription, 'description')"
        />
      </div>
      <footer class="pb-8">
        <button
          type="button"
          class="rounded bg-red-400 px-2 py-1 text-white right-5 absolute"
          @click="deleteCard"
        >
          Delete Card
        </button>
      </footer>
    </section>
  </dialog>
</template>