<template>
  <div class="wrapper">
    <div class="form_group">
      <label for="email">Email</label>
      <br />
      <input name="email" type="email" class="form_control" v-model="email" />
    </div>
    <div class="form_group">
      <label for="password">Password</label>
      <br />
      <input name="password" type="password" class="form_control" v-model="password" />
    </div>
    <div class="form_group">
      <button class="btn btn_primary" @click="handleLogin">Login</button>
      <br />
      <br />
      <strong>
        <router-link :to="{ name: 'register' }" class="">
          Or click here to register
        </router-link>
      </strong>
    </div>
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

<style scoped></style>