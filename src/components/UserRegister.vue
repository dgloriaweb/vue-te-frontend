<template>
  <div>
    <div>
      <label for="name">Name</label>
      <br />
      <input name="name" type="text" v-model="name" />
    </div>
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
      <label for="password_confirmation">Confirm Password</label>
      <br />
      <input name="password_confirmation" type="password" v-model="password_confirmation" />
    </div>
    <button @click="register">Sign Up</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useStore } from '../store/index'
import router from '../router'
const store = useStore()


// data
var name = ref('name')
var email = ref('email')
var password = ref('password')
var password_confirmation = ref('password_confirmation')

// var successful = false

function register() {
  // successful = false

  const headers = {
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value,
  }
  return axios
    .post(process.env.VUE_APP_API_URL + '/api/register', headers)
    .then((response) => {
      console.log(response);
      store.checkLoggedInStatus();
      // successful = true
      router.push('/')

    })
    .catch((error) => {
      return error.response
    })
}
</script>
