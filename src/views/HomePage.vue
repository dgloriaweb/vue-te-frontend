<template>
  <div class="">
    <h1>List of Recommended Jobs</h1>

    {{ jobStore.match_rates }}
  </div>
</template>

<script setup>
import { useJobStore } from '../store/jobstore'
const jobStore = useJobStore()


</script>

<style scoped>
</style>