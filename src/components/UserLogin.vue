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
import { useJobStore } from '../store/jobstore'
import router from '../router'

const store = useStore()
const jobStore = useJobStore()

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
        alert("login successful")
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      store.checkLoggedInStatus();
      jobStore.getJobSummaryData()
      router.push('/')
    })
    .catch((error) => {
      if (error.response.data.errors) {
        alert(error.response.data.errors);
      } else {
        console.log('unhandled error');
      }
    })
}
</script>

<style scoped>
</style>