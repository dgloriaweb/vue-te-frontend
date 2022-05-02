<template>
  <div class="">
    <nav>
      <router-link to="/">Home</router-link>
      &nbsp;
      <button @click="logout" v-if="store.isLoggedIn">
        <i class="fa-solid fa-user"></i> Logout
      </button>
      <button @click="login" v-if="!store.isLoggedIn">
        <i class="fa-solid fa-user"></i> Login
      </button>
      <button @click="register" v-if="!store.isLoggedIn">
        <i class="fa-solid fa-user"></i> Register
      </button>
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
  store.setLoggedInStatus();
  jobStore.$reset()
  router.push('/')
}
function login() {
  router.push('/login')
}
function register() {
  router.push('/register')
}

onMounted(() => {
  store.initialiseComponents()
})

</script>

<style scoped>
</style>