import {createRouter, createWebHashHistory} from 'vue-router'
import Layout from '../views/Layout.vue'
import List from '../views/List.vue'
import Login from '../views/Login.vue'

// 在 Vue-router新版本中，需要使用createRouter来创建路由
export default createRouter({
  // 指定路由的模式,此处使用的是hash模式
  history: createWebHashHistory(),
  // 路由地址
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Login,
        },
        {
          path: '/list',
          component: List,
        },
        {
          path: '/login',
          component: Login,
        },
      ],
    },
  ],
})
