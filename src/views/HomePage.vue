<template>
  <div class="">
        <div id="myGridColumn" v-if="jobStore.match_rates">
      <h2>Your Personal Preferences</h2>
      <div id="ratesContainer">
        <div v-for="job in jobStore.match_rates" :key="job.id" id="myGridRow">
          <div class="grid-cell-1">
            <router-link :to="{ name: 'jobDetail', params: { id: job.id } }">{{
              job.job_name
            }}</router-link>
          </div>
          <div class="grid-cell-2">
            {{ job.job_rate }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useJobStore } from '../store/jobstore'
const jobStore = useJobStore()


</script>

<style scoped>
</style>