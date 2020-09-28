import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../views/Layout.vue'

const loadView = (view) => {
  return () => import(`../views/${view}.vue`)
}
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/file',
      children: [
        {
          name: 'file-list',
          path: '/file',
          component: loadView('FileList'),
        },
        {
          name: 'file-detail',
          path: '/blob',
          component: loadView('FilePreview'),
        },
        {
          name: 'login',
          path: '/login',
          component: loadView('Login'),
        },
      ],
    },
  ],
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})
export default router
