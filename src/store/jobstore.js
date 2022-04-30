//stores/users.js

import { defineStore } from 'pinia'
import jobService from '../services/job.service'

// always rename the defineStore because it can cause disambiguity if names are the same
export const useJobStore = defineStore('jobs', {
  state: () => ({
      match_rates:null,
      personUpdated:null
  }),
  getters: {
    // getMatchRates(state) {
    //     return state.match_rates
    //   },
    // getPersonUpdated(state) {
    //     return state.personUpdated
    //   },
  },
  actions: {
    getJobSummaryData() {
      jobService
        .getMyJobs()
        .then((response) => {
          this.match_rates = response.data.all_job_match_rates
          this.personUpdated = response.data.person
          //take result and make a copy to use in the template, so that it can be compared if any changes.
          // person = JSON.parse(JSON.stringify(response.data.person)) //original api values
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
          console.log(error)
        })
    },
  },
})
