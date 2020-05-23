
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
      { path: 'index', name: 'top', component: () => import('pages/Index.vue') },
      { path: 'sample-list', name: 'sampleList', component: () => import('pages/SampleList.vue') },
      { path: 'sample-form', name: 'sampleForm', component: () => import('pages/SampleForm.vue') }
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
