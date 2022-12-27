<template>
  <div id="header">
    <div id="logo_wrapper">
      <img id="logo_img" width="75" height="75" src="/assets/images/logo.png" />
      <img
        id="logo_text"
        width="400"
        height="115"
        src="/assets/images/logo_text2.png"
      />
    </div>
    &nbsp;
    <a href="https://talentexploit-wiki.netlify.app/" class="btn btn_secondary">
      Docs
    </a>
    &nbsp;
    <div @click="logout" v-if="store.isLoggedIn" class="btn btn_secondary">
      <i class="fa-solid fa-user"></i> Logout
    </div>
    <div @click="login" v-if="!store.isLoggedIn" class="btn btn_secondary">
      <i class="fa-solid fa-user"></i> Login
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


function logout() {
  store.logout()
  store.setLoggedInStatus();
  jobStore.$reset()
  route.push('/')
}
function login() {
  route.push('/login')
}


onMounted(() => {
  store.initialiseComponents()
})

</script>

<style scoped>
</style>