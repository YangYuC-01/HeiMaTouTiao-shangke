import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'qa',
        component: () => import('@/views/qa')
      }, {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search')
  }

]

const router = new VueRouter({
  routes
})

export default router
