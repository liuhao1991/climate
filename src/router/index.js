/*
 * @Author: lh@metgs.com
 * @Date: 2022-01-17 14:37:35
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2022-01-25 16:06:50
 * @Description: ...
 */
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "Index" */'@/views/index/Index'),
    meta: { title: '首页', icon: 'MessageBox', affix: true, tags: true }
  },
  {
    path: '/home',
    component: () => import(/* webpackChunkName: "Layout" */'@/views/Layout'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */'@/views/Home'),
        meta: { title: '节目管理', icon: 'MessageBox', affix: true, tags: true }
      }
    ]
  },
  {
    path: '/about',
    component: () => import(/* webpackChunkName: "Layout" */'@/views/Layout'),
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    children: [
      {
        path: '',
        name: 'About',
        component: () => import(/* webpackChunkName: "About" */'@/views/About'),
        meta: { title: '关于', icon: 'MessageBox', affix: false, tags: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_PUBLIC_PATH),
  routes
})

export default router
