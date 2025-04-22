const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: 'about', component: () => import('pages/AboutPage.vue') },
      { path: 'privacy', component: () => import('pages/PrivacyPolicy.vue') },
      { path: 'contact', component: () => import('pages/ContactPage.vue') },
      { path: 'postsubscribe', component: () => import('pages/Postsubscribe.vue') },
      { path: 'signuptoearlyaccess', component: () => import('pages/SignUpToEarlyAccess.vue') },
      { path: 'investorcrm', component: () => import('pages/InvestorCrm.vue') },
      { path: 'tools', component: () => import('pages/Tools.vue') },
      { path: 'tools/brrcalc', component: () => import('pages/tools/BrrCalc.vue') },
      { path: 'tools/flipcalc', component: () => import('pages/tools/FlipCalc.vue') },
      { path: 'tools/simpleroicalc', component: () => import('pages/tools/SimpleRoiCalc.vue') },
      { path: 'tools/hmocommercialvaluecalc', component: () => import('pages/tools/HmoCommercialValuationCalc.vue') },
      { path: 'tools/training', component: () => import('pages/tools/training/TrainingHome.vue') },
      { path: 'tools/training/:tutorial', component: () => import('pages/tools/training/TrainingTutorial.vue') },
      { path: 'profile', component: () => import('pages/Profile.vue') },
      { path: 'v/:verifycode/:pimsnumber', component: () => import('pages/VerifyPims.vue') },
      { path: 'debug', component: () => import('pages/DebugInfo.vue') },
      { path: 'ppbevent', component: () => import('pages/Ppbevent.vue') },
      { path: 'tools/rentproject/enterlead', component: () => import('pages/tools/rentproject/enterlead.vue') },
      { path: 'tools/rentproject/callleads', component: () => import('pages/tools/rentproject/callleads.vue') },
      { path: 'tools/rentproject/batchcallleads', component: () => import('pages/tools/rentproject/batchcallleads.vue') },
      { path: 'tools/rentproject/rentcalc', component: () => import('pages/tools/rentproject/rentCalc.vue') },
      { path: 'tools/rentproject/showviewings', component: () => import('pages/tools/rentproject/showViewings.vue') },
      { path: 'tools/rentproject/showviewingsforpatch', component: () => import('pages/tools/rentproject/showViewingsForPatch.vue') },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/RefurbCalcLayout.vue'),
    children: [
      { path: 'tools/refurbcalc', component: () => import('pages/tools/RefurbishmentCalc.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/CanSavePagesLayout.vue'),
    children: [
      { path: 'tools/cansave/patches', component: () => import('pages/tools/cansave/Patches.vue') },
      { path: 'tools/cansave/patches/:patchid', component: () => import('pages/tools/cansave/Patch.vue') },
      { path: 'tools/cansave/todo', component: () => import('pages/tools/cansave/Todo.vue') },
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
