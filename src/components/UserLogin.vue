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
import { ref, onMounted } from 'vue'
import authService from '@/services/auth.service'
import { useStore } from '@/store/index'
import { useRouter } from 'vue-router'

// data
var email = ref('email')
var password = ref('password')
const store = useStore()
const route = useRouter()

// methods
function handleLogin() {
  let user = {
    email: email.value,
    password: password.value
  }
  authService.login(user).then(() =>
    route.push({ name: 'homePage' })
  )
}
onMounted(() => {
  if (store.userId) {
    route.push({ name: 'homePage' })
  }
})
</script>

<style scoped>
</style>