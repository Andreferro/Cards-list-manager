import { h } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import ListCardDetails from '@/views/ListCardDetails.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // Gambiarra
      // https://github.com/vuejs/vue-router/issues/2105#issuecomment-678980641
      // https://github.com/vuejs/vue-router/issues/2105#issuecomment-739868270
      component: { render: () => h('router-view'), },
      children: [
        {
          path: '/:listId/:cardId',
          component: ListCardDetails
        },
      ]
    },
  ]
});

export default router;
