import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import TestPage from '../views/TestPage.vue'
import Login from '../components/UserLogin.vue'
import JobDetail from '../views/JobDetail.vue'

const routes = [
 
  {
    path: '/',
    name: 'homePage',
    component: HomePage
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/jobs/:id',
    name: 'jobDetail',
    component: JobDetail,
    params: true,
  },
  {
    path: '/testPage',
    name: 'testPage',
    component: TestPage,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
