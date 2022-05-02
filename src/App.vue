<template>
  <myheader />
  <router-view />
</template>

<script>
import myheader from "./components/MyHeader.vue"


export default {
  components: {
    myheader
  }
}
</script>

<style>
</style>
