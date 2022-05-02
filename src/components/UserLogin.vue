<template>
  <div>
    <label for="email">Email</label>
    <br />
    <input name="email" type="email" v-model="email" />
  </div>
  <div>
    <label for="password">Password</label>
    <br />
    <input name="password" type="password" v-model="password" />
  </div>
  <div>
    <button class="submit" @click="handleLogin">Login</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import authService from '@/services/auth.service'

// data
var email = ref('email')
var password = ref('password')

// methods
function handleLogin() {
  let user = {
    email : email.value,
    password : password.value
  }
  console.log(user);
  authService.login(user)
}
</script>

<style scoped>
</style>