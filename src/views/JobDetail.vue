<template>
  <div>
    <h1>{{ job.job_name }}</h1>

    <h2>Position Specifics</h2>
    <h3>Usual work location</h3>
    <div>
      Work should be in the workplace: {{ (job.workplace) ? "yes" : "no" }}
    </div>
    <div>Usually remote:{{ (job.remote) ? "yes" : "no" }}</div>
    <br />
    <h3>Usual working days</h3>
    <div>Work workdays only: {{ (job.workdays) ? "yes" : "no" }}</div>
    <div>Work Saturdays too: {{ (job.saturday) ? "yes" : "no" }}</div>
    <div>Work Sundays too: {{ (job.sunday) ? "yes" : "no" }}</div>
    <div>Work bank holidays too: {{ (job.bank_holidays) ? "yes" : "no" }}</div>
    <h4>Special working days</h4>
    <div>
      Has to work only Saturdays, Sundays and Bank holidays:
      {{ (job.sat_sun_bh_only) ? "yes" : "no" }}
    </div>
    <br />
    <h3>Usual working hours</h3>
    <div>Normal hours: {{ (job.normal_hours) ? "yes" : "no" }}</div>
    <div>Nightshift: {{ (job.nightshift) ? "yes" : "no" }}</div>
    <div>Other shift: {{ (job.other_shift) ? "yes" : "no" }}</div>
    <h4>Special working hours</h4>
    <div>Nightshift only: {{ (job.nightshift_only) ? "yes" : "no" }}</div>
    <div>Other shift only: {{ (job.other_shift_only) ? "yes" : "no" }}</div>
    <h3>Other</h3>
    <div>Must do overtime: {{ (job.overtime) ? "yes" : "no" }}</div>
    <div>Keywords: {{ (job.keywords) }}</div>
    <div>List of similar jobs: {{ (job.similar_jobs) ? "yes" : "no" }}</div>
    <!-- <h1>
      Drivers license: {{ job.job_drivers_licenses[0].driver.drivers_license }}
    </h1> -->
  </div>
</template>

<script>
import jobService from '../services/job.service'

export default {
  name: "JobDetail",
  data() {
    return {
      job: {}
    }
  },
  created() {
    this.fetchData()
  },

  computed: {
    styles() {
      return {
      }
    }
  },
  methods: {
    fetchData: async function () {
      // get this job using the id in the url
      jobService.getJobDetails(this.$route.params.id).then(
        (response) => {
          this.job = response.data
          console.log(this.job)
        },
        (error) => {
          console.log(error)
          this.error =
            error?.response?.data?.message || error.message
        }
      )
    }
  }
};
</script>

<style lang="scss" scoped>
</style>