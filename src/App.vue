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
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');

html{
  font-family: "Open Sans";
}
#wrapper {
  background: #383838;
  max-width: 1600px;
  width: 90vw;
  margin: auto;
  min-height: 90vh;
}
.red-text {
  color: red;
}
.green-text {
  color: green;
}
.danger{
  color:red;
  background-color: rgb(255, 205, 205);
}
.success{
  color:green;
  background-color: rgb(205, 255, 205);
}
</style>
