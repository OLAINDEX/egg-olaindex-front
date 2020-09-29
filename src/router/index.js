import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {createRouter, createWebHashHistory} from 'vue-router'

const loadView = (view) => {
  return () => import(`../views/${view}.vue`)
}
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: loadView('Home'),
      meta: {
        title: 'OLAINDEX',
        requireAuth: false,
      },
    },
    {
      name: 'Login',
      path: '/login',
      component: loadView('Login'),
      meta: {
        title: '登录',
        requireAuth: false,
      },
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
