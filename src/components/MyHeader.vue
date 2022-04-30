<template>
  <div class="">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <button @click="logout" v-if="store.isLoggedIn">Logout</button>
      <button @click="login" v-if="!store.isLoggedIn">Login</button>
      <button @click="register" v-if="!store.isLoggedIn">Register</button>
    </nav>
  </div>
</template>

<script setup>
import { useStore } from '../store/index'
import { useJobStore } from '../store/jobstore'
import { onMounted } from 'vue'
import router from '../router'


const store = useStore()
const jobStore = useJobStore()
// const isLoggedIn = ref('isLoggedIn')
function logout() {
  store.logout()
  store.checkLoggedInStatus();
  router.push('/')
}
function login() {
  router.push('/login')
}
function register() {
  router.push('/register')
}

onMounted(() => {
  store.checkLoggedInStatus();
  jobStore.getJobSummaryData()
})

</script>

<style scoped>
</style>