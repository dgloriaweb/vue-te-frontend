<template>
  <div id="myGridContainer" v-if="jobStore.personUpdated">
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
    <div id="myGridColumn" v-if="jobStore.personUpdated">
      <h2>List of your preferences/settings</h2>

      <div id="settingsContainer">
        <div class="grid-cell-1">
          <h3>Usual work location</h3>

          <input
            type="checkbox"
            name="workplace"
            id="workplaceChk"
            v-model="jobStore.personUpdated.workplace"
          />
          <label for="workplaceChk">I want to work at the workplace</label>
          <br />
          <input
            type="checkbox"
            name="remote"
            id="remoteChk"
            v-model="jobStore.personUpdated.remote"
          />
          <label for="remoteChk">I want to work remotely</label>
          <br />
          <h3>Usual working days</h3>
          <input
            type="checkbox"
            name="workdays"
            id="workdaysChk"
            v-model="jobStore.personUpdated.workdays"
          />
          <label for="workdaysChk">I want to work workdays</label>
          <br />
          <input
            type="checkbox"
            name="saturday"
            id="saturdayChk"
            v-model="jobStore.personUpdated.saturday"
          />
          <label for="saturdayChk">Can do Saturdays</label>
          <br />
          <input
            type="checkbox"
            name="sunday"
            id="sundayChk"
            v-model="jobStore.personUpdated.sunday"
          />
          <label for="sundayChk">Can do Sundays</label>
          <br />
          <input
            type="checkbox"
            name="bank_holidays"
            id="bank_holidaysChk"
            v-model="jobStore.personUpdated.bank_holidays"
          />
          <label for="bank_holidaysChk">Can do bank holidays</label>
          <br />

          <h4>Special working days</h4>
          <input
            type="checkbox"
            name="sat_sun_bh_only"
            id="sat_sun_bh_onlyChk"
            v-model="jobStore.personUpdated.sat_sun_bh_only"
          />
          <label for="sat_sun_bh_onlyChk"
            >want to work only Saturdays, Sundays and Bank holidays</label
          >
          <br />

          <h3>Usual working hours</h3>
          <input
            type="checkbox"
            name="normal_hours"
            id="normal_hoursChk"
            v-model="jobStore.personUpdated.normal_hours"
          />
          <label for="normal_hoursChk">Want to work normal hours</label>
          <br />
          <input
            type="checkbox"
            name="nightshift"
            id="nightshiftChk"
            v-model="jobStore.personUpdated.nightshift"
          />
          <label for="nightshiftChk">Can do nightshift</label>
          <br />
          <input
            type="checkbox"
            name="other_shift"
            id="other_shiftChk"
            v-model="jobStore.personUpdated.other_shift"
          />
          <label for="other_shiftChk">Can do other shift</label>
          <br />

          <h4>Special working hours</h4>
          <input
            type="checkbox"
            name="nightshift_only"
            id="nightshift_onlyChk"
            v-model="jobStore.personUpdated.nightshift_only"
          />
          <label for="nightshift_onlyChk">Want to do nightshift only</label>
          <br />
          <input
            type="checkbox"
            name="other_shift_only"
            id="other_shift_onlyChk"
            v-model="jobStore.personUpdated.other_shift_only"
          />
          <label for="other_shift_onlyChk"
            >Want to do ther shift only (eg. late afternoons)</label
          >
          <br />
          <h3>Other</h3>
          <input
            type="checkbox"
            name="overtime"
            id="overtimeChk"
            v-model="jobStore.personUpdated.overtime"
          />
          <label for="overtimeChk">Want to do jobs that has overtime</label>
          <br />
        </div>

        <br />
        <button @click="confirmPersonSettingChanges()">Store settings</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useJobStore } from '../store/jobstore'
import personService from '../services/person.service'

const jobStore = useJobStore()

function confirmPersonSettingChanges() {
  // validation here
  storePersonData()
}

function storePersonData() {
  personService.updatePerson(jobStore.personUpdated).then(
    (response) => {
      if (response.status == 223) {
        alert(response.data)
      }
      else if (response.status != 200) {
        alert('unhandled error');
      }
      else {
        alert('settings updated')
      }
      jobStore.setJobSummaryData() // this might not even be required...

    })
    .catch(error => {
      if (error.response.data.errors) {
        alert(error.response.data.errors);
      } else {
        alert('unhandled error');
      }
    })
}

</script>

<style scoped>
#myGridContainer {
  width: fit-content;
  display: flex;
  gap: 35px;
}
#myGridColumn {
  padding: 15px;
}
#myGridRow {
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 10px;
}

.grid-cell-1 {
  width: max-content;
}
.grid-cell-2 {
  text-align: right;
}
.grid-cell-2:after {
  content: "%";
}
</style>