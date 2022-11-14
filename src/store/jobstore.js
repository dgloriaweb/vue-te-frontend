//stores/users.js

import { defineStore } from 'pinia'
import jobService from '@/services/job.service'

// always rename the defineStore because it can cause disambiguity if names are the same
export const useJobStore = defineStore('jobs', {
  state: () => ({
    match_rates: null,
    jobUpdated: {
      workdays: null   // u have to declare workdays, because u receive error of undefined when the page is rendered
    },
    personUpdated: {
      workdays: null
    },
    job: null,
  }),
  getters: {
    getMatchRates(state) {
      return state.match_rates
    },
    getPersonUpdated(state) {
      return state.personUpdated
    },
    getJob(state) {
      return state.job
    },
  },
  actions: {
    setJobSummaryData() {
      jobService
        .setJobSummaryData()
        .then((response) => {
          this.all_match_rates = response.data.all_job_match_rates
          this.match_rates = response.data.job_match_rates
          this.personUpdated = response.data.person
          // ** change all numeric values to true or false would make errors in id fields. Exclude these.
          // this results an array like ['nightshift_only', 0]
          Object.entries(this.personUpdated).forEach((entry) => {
            if (entry[0] == 'user_id' || entry[0] == 'id') {
              return
            } else {
              this.personUpdated[entry[0]] = entry[1] == 1 ? true : false
            }
          })
        })
        .catch((error) => {
          // TODO: make these generic for most requests
          alert('error in setJobSummaryData: '.error)
          if (error.toString().includes('Network Error')) {
            return 'Network error'
          } else if (error.toString().includes('401')) {
            return '401'
          } else {
            return error
          }
        })
    },
    setJob(id) {
      jobService
        .getJobDetails(id)
        .then((response) => {
          this.job = response.data
          Object.entries(this.job).forEach((entry) => {
            if (entry[0] == 'job_name' || entry[0] == 'id') {
              return
            } else {
              this.job[entry[0]] = entry[1] == 1 ? true : false
            }
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    unsetJob() {
      this.job = null
      //also clear it from the cache
    },
  },
})
