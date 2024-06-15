import { createWebHashHistory, createRouter } from 'vue-router'

import Home from '@components/Home.vue'
import ViewMore from '@components/ViewMore.vue'
import PageNotFound from '@components/PageNotFound.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/new-songs', component: ViewMore},
  { path: '/top-download', component: ViewMore},
  { path: "/:pathMatch(.*)*", component: PageNotFound }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router