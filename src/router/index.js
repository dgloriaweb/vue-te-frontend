import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Login from '../components/UserLogin.vue'
import Register from '../components/UserRegister.vue'
import UserSkills from '../components/UserSkills.vue'
import JobDetailEdit from '../components/JobDetailEdit.vue'
import JobDetail from '../views/JobDetail.vue'

const routes = [
  {
    path: '/',
    name: 'homePage',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/userSkills',
    name: 'userSkills',
    component: UserSkills,
  },
  {
    path: '/jobs/:id',
    name: 'jobDetail',
    component: JobDetail,
    params: true,
  },
  {
    path: '/jobs/:id/edit',
    name: 'jobDetailEdit',
    component: JobDetailEdit,
    params: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
