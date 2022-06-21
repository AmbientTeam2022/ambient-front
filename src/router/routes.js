import { useAuthStore } from 'src/stores/useAuthStore'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: (to, from) => {
      const authStore = useAuthStore()
      if (!authStore.user) return { name: 'login' }
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('pages/Dashboard.vue'),
      },
      {
        path: 'device',
        name: 'deviceList',
        component: () => import('pages/DeviceList.vue'),
      },
      {
        path: 'device/new',
        name: 'newDevice',
        component: () => import('pages/NewDevice.vue'),
      },
    ],
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Login.vue'),
    beforeEnter: (to, from) => {
      const authStore = useAuthStore()
      if (authStore.user) return { name: 'dashboard' }
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
