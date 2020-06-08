
const routes = [
  { // Auth Routes
    path: '/auth',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: 'login', name: 'login', component: () => import('pages/auth/Login') }
    ]
  },
  { // Main Routes
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { authRequired: true },
    children: [
      { path: 'top', name: 'top', component: () => import('pages/Index.vue') },
      { path: 'food', name: 'food', component: () => import('pages/Food.vue') },
      { path: 'menu', name: 'menu', component: () => import('pages/Menu.vue') },
      { path: 'eat', name: 'eat', component: () => import('pages/Eat.vue') },
      { path: 'plan', name: 'plan', component: () => import('pages/Plan.vue') },
      { path: 'point', name: 'point', component: () => import('pages/Point.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
