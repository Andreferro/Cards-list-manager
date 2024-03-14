<script
  setup
  lang="ts"
>
import { ref } from 'vue';

const { initialValue } = defineProps<{
  initialValue: string,
  onSubmit: (t: string) => void,
}>();

const currentText = ref(initialValue);
const isEditing = ref(!initialValue);

function toggleIsEditing() { isEditing.value = !isEditing.value; }
</script>
<template>
  <div v-if="isEditing">
    <form @submit.prevent="() => onSubmit(currentText)">
      <input
        v-model="currentText"
        className="bg-gray-50 dark:bg-gray-600 p-1 rounded w-10/12 dark:text-white outline-none"
        placeholder="List title"
      />
    </form>
  </div>
  <div v-else>
    <button
      @click="toggleIsEditing"
      type="button"
      className="p-1 w-full text-left dark:text-white"
    >
      {{ currentText }}
    </button>
  </div>
</template>
