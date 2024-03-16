import { createRouter, createWebHistory } from 'vue-router';
import BaseCardDialog from '@/components/BaseCardDialog.vue';
import PassThroughView from '@/components/PassThroughView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // Gambiarra
      // https://github.com/vuejs/vue-router/issues/2105#issuecomment-524409039
      component: PassThroughView,
      children: [
        {
          path: '/:listId/:cardId',
          component: BaseCardDialog,
        },
      ]
    },
  ]
});

export default router;
