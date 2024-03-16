import localforage from 'localforage';
import { defineStore } from 'pinia';
import type { ListType } from "@/App.vue";

export const useListsStore = defineStore('lists', {
  state: () => {
    return { listsArray: [] as ListType[] };
  },
  actions: {
    updateLists(newListArray: ListType[]) {
      localforage.setItem('lists', newListArray);
      this.listsArray = newListArray.slice();
    },
  },
})
