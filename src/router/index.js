import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {createRouter, createWebHashHistory} from 'vue-router'
import {load} from '/@/api/init'
import store from '/@/libs/store'
import {getToken} from '/@/utils/auth'
import {markTitle} from '/@/utils/index'
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
        title: 'Home',
        requiresAuth: false,
      },
    },
    {
      name: 'List',
      path: '/d/:id',
      component: loadView('Home'),
      meta: {
        title: 'Disk',
        requiresAuth: false,
      },
    },
    {
      name: 'Image',
      path: '/image',
      component: loadView('Image'),
      meta: {
        title: 'Image',
        requiresAuth: false,
      },
    },
    {
      name: 'Login',
      path: '/login',
      component: loadView('Login'),
      meta: {
        title: '登录',
        requiresAuth: false,
      },
    },
    {
      name: 'Install',
      path: '/install',
      component: loadView('Install'),
      meta: {
        title: '安装',
        requiresAuth: false,
      },
    },
    {
      name: 'Admin',
      component: ADMIN,
      path: '/admin',
      children: [
        {
          name: 'Dashboard',
          path: '',
          component: loadView('admin/Dashboard'),
          meta: {
            title: '控制台',
            requiresAuth: true,
          },
        },
        {
          name: 'Profile',
          path: 'profile',
          component: loadView('admin/Profile'),
          meta: {
            title: '用户信息',
            requiresAuth: true,
          },
        },
        {
          name: 'Setting',
          path: 'setting',
          component: loadView('admin/Setting'),
          meta: {
            title: '设置',
            requiresAuth: true,
          },
        },
        {
          name: 'Account',
          path: 'account',
          component: loadView('admin/Account'),
          meta: {
            title: '账号',
            requiresAuth: true,
          },
        },
        {
          name: 'AccountSetting',
          path: 'account/:id',
          component: loadView('admin/AccountSetting'),
          meta: {
            title: '账号详情',
            requiresAuth: true,
          },
        },
      ],
    },
  ],
})
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  markTitle('OLAINDEX - ' + to.meta.title)
  const ACCESS_TOKEN = getToken()
  const LOGIN_PAGE_NAME = 'Login'
  const app = store.get('app')
  if (typeof app === 'undefined') {
    await load().then((res) => {
      store.set('app', res.data)
    })
  }
  if (ACCESS_TOKEN && to.name === LOGIN_PAGE_NAME) {
    next({
      path: '/admin',
    })
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!ACCESS_TOKEN && to.name !== LOGIN_PAGE_NAME) {
      next({
        name: LOGIN_PAGE_NAME,
      })
    } else if (!ACCESS_TOKEN && to.name === LOGIN_PAGE_NAME) {
      next()
    } else {
      next()
    }
  } else {
    next()
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
