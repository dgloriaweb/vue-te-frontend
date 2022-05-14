// SubscriptionForm.vue
<template>
  <form @submit.prevent="subscribe" v-if="props.age">
    <label>Email
      <input v-model="email" type="email"/>
    </label>
    <button>Subscribe</button>
  </form>
</template>

<script setup>
import { computed } from "@vue/reactivity"
import {defineEmits, defineProps } from 'vue'
const props = defineProps({
  age: {
    type: Number,
    required: true
  }
})
const email = computed({
  get() {
    return props.email
  },
  set(value) {
    emit('subscribe:user', value)
  }
})

const emit = defineEmits(['subscribe:user', 'subscribe'])

function subscribe() {
  emit('subscribe')
}
</script>