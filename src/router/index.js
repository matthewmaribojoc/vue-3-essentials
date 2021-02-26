import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Recipe from '../views/Recipe.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/recipe',
      component: Recipe,
    },
  ],
})

export default router
