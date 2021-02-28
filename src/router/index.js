import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Recipe from '../views/Recipe.vue'

const router = createRouter({
  history: createWebHistory('/vue-3-essentials-demo/'),
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        key: () => 'default',
      },
    },
    {
      path: '/recipe',
      component: Recipe,
      meta: {
        key: (route) => route.fullPath,
      },
    },
  ],
})

export default router
