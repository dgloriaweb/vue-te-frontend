<template>
  <myheader />
  <router-view />
  <myfooter/>
</template>

<script>
import myheader from "./components/MyHeader.vue"
import myfooter from "./components/MyFooter.vue"


export default {
  components: {
    myheader,
    myfooter
  }
}
</script>

<style>
</style>
