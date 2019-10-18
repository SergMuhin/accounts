const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { name: 'home', path: '', component: () => import('pages/Index.vue') },
      {
        name: 'accounts',
        path: '/accounts',
        component: () => import('pages/Accounts.vue')
      },
      {
        name: 'operational-days',
        path: '/operational-days',
        component: () => import('pages/OperationalDays.vue')
      },
      {
        name: 'operations',
        path: '/operations',
        component: () => import('pages/Operations.vue')
      }
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
