<script
  setup
  lang="ts"
>
import type { ListType } from "@/App.vue";
import BaseInput from "./BaseInput.vue";
import BaseListOptionsMenu from "./BaseListOptionsMenu.vue";

const { id, title } = defineProps<{
  id: string,
  title: string,
  listsArray: ListType[],
  loadData: () => void,
  updateTitle: (t: string) => void,
}>();

</script>

<template>
  <div className="list">
    <div className="relative w-52">
      <BaseInput
        :initialValue="title"
        :onSubmit="updateTitle"
      />
      <BaseListOptionsMenu
        :elementId="id"
        elementType="list"
        :list="listsArray"
        :refresh="() => {}"
        :handleCreateCard="loadData"
      />
    </div>
    <!-- {cards.map((card) => (
    <Link
      key={card.id}
      to={`/${id}/${card.id}`}
    >
    <div className="list-card">
      <strong>{card.title}</strong>
    </div>
    </Link>
    ))} -->
    <!-- <BlueButton onClick={()=> createCard(id, title, cards)}>
      New Card
    </BlueButton> -->
  </div>
</template>

<style scoped></style>./BaseListOptionsMenu.vue
