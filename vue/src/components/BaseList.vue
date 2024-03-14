<script
  setup
  lang="ts"
>
import BaseInput from "./BaseInput.vue";
const { title } = defineProps<{
  title: string,
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
      <!-- <OptionsMenu
        elementId={id}
        elementType="list"
        list={listsArray}
        refresh={loadData}
      /> -->
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

<style scoped></style>
