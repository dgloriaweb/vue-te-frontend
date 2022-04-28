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
import axios from 'axios'
import { useStore } from '../store/index'
import router from '../router'

const store = useStore()

// data
var email = ref('email')
var password = ref('password')

// methods
function handleLogin() {

  const headers = {
    grant_type: 'client_credentials',
    client_id: process.env.VUE_APP_CLIENT_ID,
    client_secret: process.env.VUE_APP_CLIENT_SECRET,
    email: email.value,
    password: password.value,
    password_confirmation: password.value,
  }
  return axios
    .post(process.env.VUE_APP_API_URL + '/api/login', headers)
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      console.log('token saved')
      store.checkLoggedInStatus();
      // return response.data
      router.push('/')

    })
    .catch((error) => {
      return error.response
    })
}
</script>

<style scoped>
</style>