import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {createRouter, createWebHashHistory} from 'vue-router'
import {load} from '/@/api/init'
import store from '/@/libs/store'
import ADMIN from '/@/views/admin/AdminLayout.vue'

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
    {
      name: 'Install',
      path: '/install',
      component: loadView('Install'),
      meta: {
        title: '安装',
        requireAuth: false,
      },
    },
    {
      name: 'Admin',
      component: ADMIN,
      path: '/admin',
      redirect: '',
      children: [
        {
          name: 'Dashboard',
          path: '',
          component: loadView('admin/Dashboard'),
        },
        {
          name: 'Setting',
          path: 'setting',
          component: loadView('admin/Setting'),
        },
      ],
    },
  ],
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  const app = store.get('app')
  if (typeof app === 'undefined') {
    load().then((res) => {
      store.set('app', res.data)
    })
  }
  next()
})
router.afterEach(() => {
  NProgress.done()
})
export default router
