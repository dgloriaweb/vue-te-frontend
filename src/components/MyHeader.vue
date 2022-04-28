<template>
  <div class="">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/home">Test page</router-link> |
      <router-link to="/about">About</router-link>
      <button @click="logout" v-if="store.isLoggedIn">
        Logout 
      </button>
      <button @click="login" v-if="!store.isLoggedIn">
        Login
      </button>
    </nav>
  </div>
</template>

<script setup>
import { useStore } from '../store/index'
import {  onMounted } from 'vue'
import router from '../router'

const store = useStore()
// const isLoggedIn = ref('isLoggedIn')
function logout() {
  store.logout()
  store.checkLoggedInStatus();
}
function login() {
  router.push('login')
}

onMounted(() => {
  store.checkLoggedInStatus();
})

</script>

<style scoped>
</style>