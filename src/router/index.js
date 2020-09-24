import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {createRouter, createWebHashHistory} from 'vue-router'
import Layout from '../views/Layout.vue'

const loadView = (view) => {
  return () => import(`../views/${view}.vue`)
}
// 在 Vue-router新版本中，需要使用createRouter来创建路由
const router = createRouter({
  // 指定路由的模式,此处使用的是hash模式
  history: createWebHashHistory(),
  // 路由地址
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
