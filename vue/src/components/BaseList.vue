<script
  setup
  lang="ts"
>
import { storeToRefs } from "pinia";
import type { CardType } from "@/App.vue";
import { useListsStore } from "@/stores/lists";
import BaseInput from "./BaseInput.vue";
import BaseListOptionsMenu from "./BaseListOptionsMenu.vue";
import BaseButton from "./BaseButton.vue";

defineProps<{
  id: string,
  title: string,
  cardsList: CardType[],
  createCard: () => void,
  updateTitle: (t: string) => void,
}>();

const store = useListsStore();
const { listsArray } = storeToRefs(store);
</script>

<template>
  <div class="list">
    <div class="relative w-52">
      <BaseInput
        autofocus
        :initialValue="title"
        :onSubmit="updateTitle"
        placeholder="List title"
      />
      <BaseListOptionsMenu
        :elementId="id"
        elementType="list"
        :list="listsArray"
        :handleCreateCard="createCard"
      />
    </div>
    <RouterLink
      v-for="card in cardsList"
      :key="card.id"
      :to="'/' + id + '/' + card.id"
    >
      <div class="list-card">
        <strong>{{ card.title }}</strong>
      </div>
    </RouterLink>
    <BaseButton @click="createCard">
      New Card
    </BaseButton>
  </div>
</template>

<style scoped></style>
