<template>
  <div
    id="flashMessage"
    v-if="flashMessage"
    :class="flashMessageType"
  >
    <b>{{ flashMessage }}</b>
  </div>
</template>

<script>
export default {
  props: {
    flashMessage: { required: false, type: String },
    // types: danger, success
    flashMessageType: { required: true, type: String, default: "success hide" }
  },
}
</script>

<style scoped>
#flashMessage {
  text-align: center;
  width: 50vw;
  position: fixed;
  top: 150px;
  left: 25vw;
  animation-name: hide;
  animation-duration: 5s;
  animation-delay: 5s;
  animation-fill-mode: forwards
}

@keyframes hide {
  0% {
    opacity: 1;
    visibility:visible;
  }
  100% {
    opacity: 0;
    visibility:hidden;
  }
}
</style>