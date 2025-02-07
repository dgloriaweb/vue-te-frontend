import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Login from '../components/UserLogin.vue'
import Register from '../components/UserRegister.vue'
import UserSkills from '../components/UserSkills.vue'
import MatchRates from '../components/MatchRates.vue'
import AddJob from '../components/AddJob.vue'
import JobDetail from '../views/JobDetail.vue'
import About from '../views/AboutPage.vue'
import EditJobPreferences from '../components/EditJobPreferences.vue'

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
    name: 'editJobPreferences',
    component: EditJobPreferences,
    params: true,
  },
  {
    path: '/matchRates',
    name: 'matchRates',
    component: MatchRates,
  },
  {
    path: '/addJob',
    name: 'addJob',
    component: AddJob,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
