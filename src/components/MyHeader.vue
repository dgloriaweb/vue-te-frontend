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
import { useRouter } from 'vue-router'

const route = useRouter()

const store = useStore()
const jobStore = useJobStore()

function logout() {
  store.logout()
  store.setLoggedInStatus();
  jobStore.$reset()
  route.push('/')
}
function login() {
  route.push('/login')
}
function register() {
  route.push('/register')
}

onMounted(() => {
  store.initialiseComponents()
})

</script>

<style scoped>
</style>