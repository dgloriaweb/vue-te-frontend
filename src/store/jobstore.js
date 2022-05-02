//stores/users.js

import { defineStore } from 'pinia'
import { useStore } from '../store/index'
import axios from 'axios'
import jobService from '@/services/job.service'

// always rename the defineStore because it can cause disambiguity if names are the same
export const useJobStore = defineStore('jobs', {
  state: () => ({
    match_rates: null,
    personUpdated: null,
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
      const store = useStore()
      const url = process.env.VUE_APP_API_URL + '/api/home'
      axios
        .get(url, {
          headers: { Authorization: 'Bearer ' + store.access_token },
          params: {
            userId: store.userId,
          },
        })
        .then((response) => {
          this.match_rates = response.data.all_job_match_rates
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
