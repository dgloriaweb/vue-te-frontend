<template>
  <div v-if="!jobStore?.job">This job doesn't exist</div>
  <div v-if="jobStore?.job" class="wrapper">
    <div v-if="store.userId == 8 || store.userId == 9">
      <router-link
        :to="{ name: 'editJobPreferences' }"
        class="btn btn_secondary"
      >
        Edit
      </router-link>
    </div>
    <h1>{{ jobStore.job.job_name }}</h1>
    <h2>Position Specifics</h2>
    <h3>Usual work location</h3>
    <div>
      Work should be in the workplace:
      {{ jobStore.job.workplace ? "yes" : "no" }}
    </div>
    <div>Usually remote:{{ jobStore.job.remote ? "yes" : "no" }}</div>
    <br />
    <h3>Usual working days</h3>
    <div>Work workdays only: {{ jobStore.job.workdays ? "yes" : "no" }}</div>
    <div>Work Saturdays too: {{ jobStore.job.saturday ? "yes" : "no" }}</div>
    <div>Work Sundays too: {{ jobStore.job.sunday ? "yes" : "no" }}</div>
    <div>
      Work bank holidays too: {{ jobStore.job.bank_holidays ? "yes" : "no" }}
    </div>
    <h4>Special working days</h4>
    <div>
      Has to work only Saturdays, Sundays and Bank holidays:
      {{ jobStore.job.sat_sun_bh_only ? "yes" : "no" }}
    </div>
    <br />
    <h3>Usual working hours</h3>
    <div>Normal hours: {{ jobStore.job.normal_hours ? "yes" : "no" }}</div>
    <div>Nightshift: {{ jobStore.job.nightshift ? "yes" : "no" }}</div>
    <div>Other shift: {{ jobStore.job.other_shift ? "yes" : "no" }}</div>
    <h4>Special working hours</h4>
    <div>
      Nightshift only: {{ jobStore.job.nightshift_only ? "yes" : "no" }}
    </div>
    <div>
      Other shift only: {{ jobStore.job.other_shift_only ? "yes" : "no" }}
    </div>
    <h3>Other</h3>
    <div>Must do overtime: {{ jobStore.job.overtime ? "yes" : "no" }}</div>
    <div>Keywords: {{ jobStore.job.keywords }}</div>
    <div>
      List of similar jobs:
      <div
        v-for="similarJob in jobStore.job.similar_jobitems"
        :key="similarJob.id"
      >
        &nbsp;
        <small>
          {{ similarJob }}
        </small>
      </div>
    </div>
    <!-- <h1>
      Drivers license: {{ jobStore.job.job_drivers_licenses[0].driver.drivers_license }}
    </h1> -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useJobStore } from '@/store/jobstore'
import { useStore } from '@/store/index'

const jobStore = useJobStore()
const route = useRoute()
const store = useStore()

onMounted(() => {
  jobStore.setJob(route.params.id)
})

</script>

<style lang="scss" scoped>
</style>