<script
  setup
  lang="ts"
>
import { ref } from 'vue';

const { initialValue, onSubmit } = defineProps<{
  initialValue: string,
  autofocus?: boolean,
  placeholder: string,
  onSubmit: (t: string) => void,
}>();

const currentText = ref<string>(initialValue);
const isEditing = ref<boolean>(!initialValue);

function toggleIsEditing() { isEditing.value = !isEditing.value; }

function handleBlur() {
  if (initialValue !== currentText.value) onSubmit(currentText.value);
  isEditing.value = !currentText.value;
}
</script>
<template>
  <div v-if="isEditing">
    <form @submit.prevent="() => onSubmit(currentText)">
      <input
        :autofocus="autofocus"
        v-model="currentText"
        class="bg-gray-200 dark:bg-gray-600 p-1 rounded w-10/12 dark:text-white outline-none"
        :placeholder="placeholder"
        @blur="handleBlur"
      />
    </form>
  </div>
  <div v-else>
    <button
      @click="toggleIsEditing"
      type="button"
      class="p-1 w-full text-left dark:text-white"
    >
      {{ currentText }}
    </button>
  </div>
</template>
