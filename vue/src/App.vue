<script
  setup
  lang="ts"
>
import { ref, onBeforeMount, type Ref, toRaw, onUpdated } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import localforage from "localforage";
import { v4 as uuidv4 } from 'uuid';
import WaveBackground from '@/components/WaveBackground.vue';
import ListComponent from "@/components/BaseList.vue";
import ButtonComponent from "@/components/BaseButton.vue";

export type CardType = {
  id: string;
  title: string;
  description: string;
};

export type ListType = {
  id: string;
  title: string;
  cards: CardType[];
};

const darkMode = ref(false);
const lists = ref<ListType[]>([]);

function changeColorScheme() {
  darkMode.value = !darkMode.value;
  localforage.setItem('darkMode', darkMode.value);
}

onBeforeMount(async () => {
  darkMode.value = !!(await localforage.getItem('darkMode'));
  lists.value = await localforage.getItem('lists') || [];
});

async function handleCreateList() {
  const newListObject = {
    id: uuidv4(),
    title: '',
    cards: [],
  };
  await localforage.setItem('lists', [...toRaw(lists.value), newListObject]);
  lists.value.push(newListObject);
}

async function handleUpdateTitle(newTitle: string, listId: string) {
  await localforage.setItem('lists', toRaw(lists.value).map((list: ListType) => (
    { ...list, title: listId === list.id ? newTitle : list.title }
  )));
}
</script>

<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-blue-200 dark:bg-sky-900 h-[calc(100vh-6rem)] dark:text-white overflow-auto">
      <WaveBackground />

      <section class="relative">
        <div class="w-full h-full z-10 relative">
          <div class="p-5 w-full h-full flex gap-5 overflow-x-auto snap-x">
            <div
              v-for="list in lists"
              :key="list.id"
            >
              <ListComponent
                :title="list.title"
                :updateTitle="(t: string) => handleUpdateTitle(t, list.id)"
              />
            </div>
            <div className="list">
              <div className="w-52">
                <ButtonComponent :onClick=handleCreateList>
                  New List
                </ButtonComponent>
              </div>
            </div>
          </div>
        </div>

        <header>
          <div class="wrapper">
            <nav>
              <RouterLink to="/123/123">Card details</RouterLink>
            </nav>
          </div>
        </header>

        <RouterView />
      </section>
    </div>

    <footer class="bg-blue-400 dark:bg-sky-950 h-24 relative z-10 text-white p-6 text-sm shadow-md">
      Developed by
      <span class="font-semibold">
        André Ferro
      </span>
      <ul class="flex gap-8 mt-2 font-semibold">
        <li>
          <a
            class="flex gap-1 items-center"
            href="https://www.linkedin.com/in/andre-sf"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="@/assets/linkedin.png"
              alt="Linkedin"
              class="h-4"
            />
            LinkedIn
          </a>
        </li>
        <li>
          <a
            class="flex gap-1 items-center"
            href="https://github.com/andreferro"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="@/assets/github.png"
              alt="Github"
              class="h-4 invert"
            />
            Github
          </a>
        </li>
      </ul>
      <button
        type="button"
        @click="changeColorScheme"
        class="fixed z-20 right-2 bottom-2 text-base flex items-center gap-1 dark:bg-white bg-slate-700 border-[1px] border-slate-200 dark:border-slate-700 p-1 rounded dark:text-black text-white"
      >
        <span
          class="text-base"
          v-if="darkMode"
        >Light</span>
        <span
          class="text-base"
          v-else
        >Dark</span>
        &#9680;
      </button>
    </footer>
  </div>
</template>
