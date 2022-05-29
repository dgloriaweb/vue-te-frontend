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
    <button @click="validate">Sign Up</button>
  </div>
</template>

<script setup>
import { useStore } from '@/store/index'
import { useRouter } from 'vue-router'
import authService from '@/services/auth.service'
import { ref, onMounted } from 'vue'


// data
var name = ref(null)
var email = ref(null)
var password = ref(null)
var password_confirmation = ref(null)
const store = useStore()
const route = useRouter()

function validate() {
  let user = {
    email: email.value,
    password: password.value,
    name: name.value,
    password_confirmation: password_confirmation.value,
  }
  // validation
  if (!user.name || !user.email || !user.password || !user.password_confirmation) {
    alert('please fill in all details.')
  }
  else {
    register(user)
  }
}

// methods
function register(user) {

  authService.register(user).then(() =>
    route.push({ name: 'homePage' })
  )

}
onMounted(() => {
  if (store.userId) {
    route.push({ name: 'homePage' })
  }
})
</script>
