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
      <input
        name="password_confirmation"
        type="password"
        v-model="password_confirmation"
      />
    </div>
    <button @click="register">Sign Up</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import authService from '@/services/auth.service'
import { useRouter } from 'vue-router'


// data
var name = ref('name')
var email = ref('email')
var password = ref('password')
var password_confirmation = ref('password_confirmation')
const route = useRouter()

// methods
function register() {
  let user = {
    email: email.value,
    password: password.value,
    name: name.value,
    password_confirmation: password_confirmation.value,
  }
  authService.register(user)
  route.push({ name: 'homePage' })

}
</script>
