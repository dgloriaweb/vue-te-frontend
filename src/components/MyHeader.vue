<template>
  <div class="">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/home">Test page</router-link> |
      <router-link to="/about">About</router-link>
      <button @click.stop="logout">Logout</button>
      <button @click.stop="login">Login</button>
    </nav>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from '../store/index'
import router from '../router'

  
const store = useStore()
function logout() {
  store.logout()
  store.checkLoggedInStatus();
}
function login(){
    router.push('home')
}

onMounted(() => {
  store.checkLoggedInStatus();
})

</script>

<style scoped>
</style>