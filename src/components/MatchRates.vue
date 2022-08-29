
<template>
  <div id="ratesContainer" class="wrapper">
  <h1>All job rates</h1>
    <div v-for="job in jobStore.match_rates" :key="job.id" id="myGridRow">
      <div class="grid-cell-1">
        <router-link :to="{ name: 'jobDetail', params: { id: job.id } }" class="job_name">
          {{ job.job_name }}
        </router-link>
      </div>
      <div class="grid-cell-2">
        {{ job.job_rate }}
      </div>
    </div>
    <router-link :to="{ name: 'homePage' }" class="btn btn_primary">
      Back
    </router-link>
  </div>
</template>

<script setup>
import { useJobStore } from '../store/jobstore'
const jobStore = useJobStore()

</script>

<style scoped>
</style>