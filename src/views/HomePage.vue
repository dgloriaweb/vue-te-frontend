<template>
  <flash :flashMessage="flashMessage" :flashMessageType="flashMessageType" />
  <h1>List of Recommended Jobs</h1>
  <div id="myGridContainer">
    <div id="myGridColumn" v-if="match_rates">
      <h2>Your Personal Preferences</h2>
      <div id="ratesContainer">
        <div v-for="job in match_rates" :key="job.id" id="myGridRow">
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
    <div id="myGridColumn" v-if="personUpdated">
      <h2>List of your preferences/settings</h2>

      <div id="settingsContainer">
        <div class="grid-cell-1">
          <h3>Usual work location</h3>

          <input
            :myClass="{ 'red-text': isDirty['workplace'] }"
            type="checkbox"
            name="workplace"
            id="workplaceChk"
            v-model="personUpdated.workplace"
          />
          <label for="workplaceChk">I want to work at the workplace</label>
          <br />
          <input
            :myClass="{ 'red-text': isDirty['remote'] }"
            type="checkbox"
            name="remote"
            id="remoteChk"
            v-model="personUpdated.remote"
          />
          <label for="remoteChk">I want to work remotely</label>
          <br />
          <h3>Usual working days</h3>
          <input
            :myClass="{ 'red-text': isDirty['workdays'] }"
            type="checkbox"
            name="workdays"
            id="workdaysChk"
            v-model="personUpdated.workdays"
          />
          <label for="workdaysChk">I want to work workdays</label>
          <br />
          <input
            :myClass="{ 'red-text': isDirty['saturday'] }"
            type="checkbox"
            name="saturday"
            id="saturdayChk"
            v-model="personUpdated.saturday"
          />
          <label for="saturdayChk">Can do Saturdays</label>
          <br />
          <input
            :myClass="{ 'red-text': isDirty['sunday'] }"
            type="checkbox"
            name="sunday"
            id="sundayChk"
            v-model="personUpdated.sunday"
          />
          <label for="sundayChk">Can do Sundays</label>
          <br />
          <input
            :myClass="{ 'red-text': isDirty['bank_holidays'] }"
            type="checkbox"
            name="bank_holidays"
            id="bank_holidaysChk"
            v-model="personUpdated.bank_holidays"
          />
          <label for="bank_holidaysChk">Can do bank holidays</label>
          <br />

          <h4>Special working days</h4>
          <input
            :myClass="{ 'red-text': isDirty['sat_sun_bh_only'] }"
            type="checkbox"
            name="sat_sun_bh_only"
            id="sat_sun_bh_onlyChk"
            v-model="personUpdated.sat_sun_bh_only"
          />
          <label for="sat_sun_bh_onlyChk"
            >want to work only Saturdays, Sundays and Bank holidays</label
          >
          <br />

          <h3>Usual working hours</h3>
          <input
            :myClass="{ 'red-text': isDirty['normal_hours'] }"
            type="checkbox"
            name="normal_hours"
            id="normal_hoursChk"
            v-model="personUpdated.normal_hours"
          />
          <label for="normal_hoursChk">Want to work normal hours</label>
          <br />
          <input
            :myClass="{ 'red-text': isDirty['nightshift'] }"
            type="checkbox"
            name="nightshift"
            id="nightshiftChk"
            v-model="personUpdated.nightshift"
          />
          <label for="nightshiftChk">Can do nightshift</label>
          <br />
          <input
            :myClass="{ 'red-text': isDirty['other_shift'] }"
            type="checkbox"
            name="other_shift"
            id="other_shiftChk"
            v-model="personUpdated.other_shift"
          />
          <label for="other_shiftChk">Can do other shift</label>
          <br />

          <h4>Special working hours</h4>
          <input
            :myClass="{ 'red-text': isDirty['nightshift_only'] }"
            type="checkbox"
            name="nightshift_only"
            id="nightshift_onlyChk"
            v-model="personUpdated.nightshift_only"
          />
          <label for="nightshift_onlyChk">Want to do nightshift only</label>
          <br />
          <input
            :myClass="{ 'red-text': isDirty['other_shift_only'] }"
            type="checkbox"
            name="other_shift_only"
            id="other_shift_onlyChk"
            v-model="personUpdated.other_shift_only"
          />
          <label for="other_shift_onlyChk"
            >Want to do ther shift only (eg. late afternoons)</label
          >
          <br />
          <h3>Other</h3>
          <input
            :myClass="{ 'red-text': isDirty['overtime'] }"
            type="checkbox"
            name="overtime"
            id="overtimeChk"
            v-model="personUpdated.overtime"
          />
          <label for="overtimeChk">Want to do jobs that has overtime</label>
          <br />
        </div>

        <button @click="updatePerson()">Store settings</button>
      </div>
    </div>
  </div>
</template>

<script>
import jobService from '../services/job.service'
import flash from '../components/FlashMessage.vue'
import axios from 'axios'

export default {

  components: {
    flash
  },
  data() {
    return {
      selected: true,
      successful: false,
      match_rates: null,
      content: null,
      person: null,
      personUpdated: null,
     
      flashMessage: null,
      flashMessageType: 'success',

    }
  },
  created() {
    this.fetchData()

  },
  methods: {
    fetchData() {
      //reset flash message class
      setTimeout(() => {
        this.flashMessage = ""
        this.flashMessageType = "success"
      }, 3000)

      jobService.getMyJobs().then(
        (response) => {
          this.content = response
          this.match_rates = this.content.data.all_job_match_rates
          this.personUpdated = response.data.person
          //take result and make a copy to use in the template, so that it can be compared if any changes.

          this.person = JSON.parse(JSON.stringify(response.data.person)) //original api values

          // ** change all numeric values to true or false would make errors in id fields. Exclude these.
          // this results an array like ['nightshift_only', 0]
          Object.entries(this.personUpdated).forEach((entry) => {
            if (entry[0] == "user_id" || entry[0] == "id") {
              return
            }
            else {
              this.personUpdated[entry[0]] = (entry[1] == 1) ? true : false
            }
          })
        })
        .catch(error => {
          if (this.content == "Network error") {
            this.flashMessage = "API server error"
            this.flashMessageType = "danger hide"
          }
          else if (this.content == "401") {
            this.flashMessage = "Unauthenticated"
            this.flashMessageType = "danger hide"
          }
          else {
            this.flashMessage = error.toString()
            this.flashMessageType = "danger hide"
          }
        })
    },

    updatePerson() {
      async (person) => {
        var storageItem = localStorage.getItem('user')
        this.access_token = JSON.parse(storageItem)['token']
        this.userId = JSON.parse(storageItem)['userId']
        if (this.access_token) {
          try {
            const url = process.env.VUE_APP_API_URL + '/api/people/' + person.id
            const response = await axios.post(url, {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + this.access_token
              },
              params: {
                userId: this.userId,
                person,
              },
            })
            return response

          } catch (error) {
            console.log(error)
          }
        } else {
          console.log('no token, relogin.')
        }

      }
    }
  }
}
</script>

<style  scoped>
</style>