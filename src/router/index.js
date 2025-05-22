import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import HomeView from '@/views/Admin/HomeView.vue'
import TeamsViews from '@/views/Admin/TeamsViews.vue'
import Operateur from '@/views/Admin/OperateursViews.vue'
import Comptes from '@/views/Admin/CompteViews.vue'
import Statistics from '@/views/Admin/statisticsViews.vue'
import Settings from '@/views/settings.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/admin',
      component: AdminLayout, // le layout s’applique à toutes les routes enfants
      children: [
        {
          path: 'home',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'teams',
          name: 'teams',
          component: TeamsViews,
        },
        {
          path: 'operateur',
          name: 'operateur',
          component:Operateur,
        },
        {
          path: 'comptes',
          name: 'comptes',
          component:Comptes,
        },
        {
          path: 'statistics',
          name: 'statistics',
          component:Statistics,
        },
        {
          path: 'settings',
          name: 'settings',
          component:Settings,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: PageNotFound,
    },
  ],
})

export default router
