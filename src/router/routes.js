
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: 'about', component: () => import('pages/AboutPage.vue') },
      { path: 'privacy', component: () => import('pages/PrivacyPolicy.vue') },
      { path: 'faq', component: () => import('pages/Faq.vue') },
      { path: 'contact', component: () => import('pages/ContactPage.vue') },
      { path: 'postsubscribe', component: () => import('pages/Postsubscribe.vue') },
      { path: 'calc/brr', component: () => import('pages/calc/Brr.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
