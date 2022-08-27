<template>
  <div id="header">

      <div id="logo_wrapper">
        <img id="logo_img" width="75" height="75" src="/assets/images/logo.png" @click="redirectHome" />
        <img id="logo_text" width="400" height="115" src="/assets/images/logo_text.png" @click="redirectHome" />
        
      </div>
      &nbsp;
      <div @click="logout" v-if="store.isLoggedIn">
        <i class="fa-solid fa-user"></i> Logout
      </div>
      <div @click="login" v-if="!store.isLoggedIn">
        <i class="fa-solid fa-user"></i> Login / Register
      </div>
      <!-- <div @click="register" v-if="!store.isLoggedIn">
        <i class="fa-solid fa-user"></i> Register
      </div> -->

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

function redirectHome() {
  route.push('/');
}
function logout() {
  store.logout()
  store.setLoggedInStatus();
  jobStore.$reset()
  route.push('/')
}
function login() {
  route.push('/login')
}
// function register() {
//   route.push('/register')
// }

onMounted(() => {
  store.initialiseComponents()
})

</script>

<style scoped>
</style>