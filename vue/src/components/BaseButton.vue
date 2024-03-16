<script
  setup
  lang="ts"
>
defineProps<{
  onClick: () => void,
}>();
</script>

<template>
  <button
    type="button"
    @click="onClick"
    class="rounded w-full text-white bg-blue-400 hover:bg-blue-500 dark:bg-sky-700 dark:hover:bg-sky-600 py-2 text-xs"
  >
    <slot />
  </button>
</template>
