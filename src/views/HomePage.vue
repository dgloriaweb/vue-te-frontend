<template>
  <div class="wrapper">
    <div v-if="!store.isLoggedIn">
      <h1>Find your true calling!</h1>
      <p>Please login to continue</p>
    </div>
    <div class="myGridContainer" v-if="jobStore.personUpdated">
      <div class="myGridColumn" v-if="jobStore.match_rates">
        <h2>Results</h2>
        <div id="ratesContainer">
          <div v-for="job in jobStore.match_rates" :key="job.id" id="myGridRow">
            <div class="grid-cell-1">
              <router-link
                :to="{ name: 'jobDetail', params: { id: job.id } }"
                class="job_name"
              >
                {{ job.job_name }}
              </router-link>
            </div>
            <div class="grid-cell-2">
              {{ job.job_rate }}
            </div>
          </div>
          <router-link :to="{ name: 'matchRates' }" class="btn btn_primary">
            See all
          </router-link>
        </div>
      </div>
      <div class="myGridColumn" v-if="jobStore.personUpdated">
        <h3>Usual work location</h3>
        <input
          type="checkbox"
          class="form-check-input"
          name="workplace"
          id="workplaceChk"
          v-model="jobStore.personUpdated.workplace"
          @change="checkWorkplace"
        />
        <label for="workplaceChk">I want to work at the workplace</label>
        <br />
        <input
          type="checkbox"
          class="form-check-input"
          name="remote"
          id="remoteChk"
          v-model="jobStore.personUpdated.remote"
          @change="checkRemote"
        />
        <label for="remoteChk">I want to work remotely</label>
        <br />
        <br />
        <h3>Overtime</h3>
        <input
          type="checkbox"
          class="form-check-input"
          name="overtime"
          id="overtimeChk"
          v-model="jobStore.personUpdated.overtime"
          @change="checkOvertime"
        />
        <label for="overtimeChk">Want to do jobs that has overtime</label>
      </div>
      <div class="myGridColumn">
        <h3>Usual working days</h3>
        <input
          type="checkbox"
          class="form-check-input"
          name="workdays"
          id="workdaysChk"
          v-model="jobStore.personUpdated.workdays"
          @change="checkWorkdays"
        />
        <label for="workdaysChk">I want to work workdays</label>
        <br />
        <input
          type="checkbox"
          class="form-check-input"
          name="saturday"
          id="saturdayChk"
          v-model="jobStore.personUpdated.saturday"
          @change="checkSaturday"
        />
        <label for="saturdayChk">Can do Saturdays</label>
        <br />
        <input
          type="checkbox"
          class="form-check-input"
          name="sunday"
          id="sundayChk"
          v-model="jobStore.personUpdated.sunday"
          @change="checkSunday"
        />
        <label for="sundayChk">Can do Sundays</label>
        <br />
        <input
          type="checkbox"
          class="form-check-input"
          name="bank_holidays"
          id="bank_holidaysChk"
          v-model="jobStore.personUpdated.bank_holidays"
          @change="checkBankholidays"
        />
        <label for="bank_holidaysChk">Can do bank holidays</label>
        <br />
        <h4>Special working days</h4>
        <input
          type="checkbox"
          class="form-check-input"
          name="sat_sun_bh_only"
          id="sat_sun_bh_onlyChk"
          v-model="jobStore.personUpdated.sat_sun_bh_only"
          @change="checkSatsunbhonly"
        />
        <label for="sat_sun_bh_onlyChk"
          >want to work only Saturdays, Sundays and Bank holidays</label
        >
        <br />
      </div>
      <div class="myGridColumn">
        <h3>Usual working hours</h3>
        <input
          type="checkbox"
          class="form-check-input"
          name="normal_hours"
          id="normal_hoursChk"
          v-model="jobStore.personUpdated.normal_hours"
          @change="checkNormalhours"
        />
        <label for="normal_hoursChk">Want to work normal hours</label>
        <br />
        <input
          type="checkbox"
          class="form-check-input"
          name="nightshift"
          id="nightshiftChk"
          v-model="jobStore.personUpdated.nightshift"
          @change="checkNightshift"
        />
        <label for="nightshiftChk">Can do nightshift</label>
        <br />
        <input
          type="checkbox"
          class="form-check-input"
          name="other_shift"
          id="other_shiftChk"
          v-model="jobStore.personUpdated.other_shift"
          @change="checkOthershift"
        />
        <label for="other_shiftChk">Can do other shift</label>
        <br />

        <h4>Special working hours</h4>
        <input
          type="checkbox"
          class="form-check-input"
          name="nightshift_only"
          id="nightshift_onlyChk"
          v-model="jobStore.personUpdated.nightshift_only"
          @change="checkNightshiftonly"
        />
        <label for="nightshift_onlyChk">Want to do nightshift only</label>
        <br />
        <input
          type="checkbox"
          class="form-check-input"
          name="other_shift_only"
          id="other_shift_onlyChk"
          v-model="jobStore.personUpdated.other_shift_only"
          @change="checkOthershiftonly"
        />
        <label for="other_shift_onlyChk"
          >Want to do other shift only (eg. late afternoons)</label
        >
        <br />
        <button id="show-modal" class="btn btn_primary" @click="showModalFunc">
          Store settings
        </button>
      </div>

      <router-link :to="{ name: 'userSkills' }" class="btn btn_primary">
        Go to my skills
      </router-link>
    </div>
    <ModalComponent
      :show="showModal"
      :modalBody="modalBodyText"
      :modalHeader="modalHeaderText"
      @close="hideModal"
      @submitModal="confirmPersonSettingChanges()"
    />
  </div>
</template>

<script setup>
import { useStore } from '@/store/index'
import { useJobStore } from '../store/jobstore'
import personService from '../services/person.service'
import ModalComponent from '@/components/ModalComponent'
import {  ref } from 'vue'

const jobStore = useJobStore()
const store = useStore()

let showModal = ref(false)
let modalHeaderText = "Confirm Changes"
let modalBodyText = "These changes will be submitted:"

function hideModal() {
  showModal.value = false
}
function showModalFunc() {
  showModal.value = true
}
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
        // alert('settings updated')
        hideModal()
        // change modal and show confirm message
        // update rates
        jobStore.setJobSummaryData()
      }
    })
    .catch(error => {
      if (error.response.data.errors) {
        alert(error.response.data.errors);
      } else {
        alert('unhandled error');
      }
    })
}

/* *******************************************************
// investigate cases of checkboxes workplace and remote
**********************************************************/

function checkWorkplace(e) {
  //console.log(e.target.checked); //tells if the checkbox is selected or not
  if (e.target.checked) {// uncheck checkRemote
    jobStore.personUpdated.remote = false
  }
}
function checkRemote(e) {
  if (e.target.checked) {
    jobStore.personUpdated.workplace = false
  }
}

/* *******************************************************
// investigate cases of checkboxes days
**********************************************************/
function checkSatsunbhonly(e) {
  if (e.target.checked) {
    jobStore.personUpdated.workdays = false
    jobStore.personUpdated.saturday = false
    jobStore.personUpdated.sunday = false
    jobStore.personUpdated.bank_holidays = false
  } else {
    jobStore.personUpdated.workdays = true
  }
}
function checkWorkdays(e) {
  if (e.target.checked) {
    jobStore.personUpdated.sat_sun_bh_only = false
  } else {
    if (jobStore.personUpdated.saturday == 1 && jobStore.personUpdated.sunday == 1 && jobStore.personUpdated.bank_holidays == 1) {
      jobStore.personUpdated.saturday = false
      jobStore.personUpdated.sunday = false
      jobStore.personUpdated.bank_holidays = false
      jobStore.personUpdated.sat_sun_bh_only = true
    }
  }
}
function checkSaturday(e) {
  if (e.target.checked) {
    if (jobStore.personUpdated.workdays == false && jobStore.personUpdated.sunday == 1 && jobStore.personUpdated.bank_holidays == 1) {
      jobStore.personUpdated.saturday = false
      jobStore.personUpdated.sunday = false
      jobStore.personUpdated.bank_holidays = false
      jobStore.personUpdated.sat_sun_bh_only = true
    } else {
      jobStore.personUpdated.sat_sun_bh_only = false
    }
  }
}
function checkSunday(e) {
  if (e.target.checked) {
    if (jobStore.personUpdated.workdays == false && jobStore.personUpdated.saturday == 1 && jobStore.personUpdated.bank_holidays == 1) {
      jobStore.personUpdated.saturday = false
      jobStore.personUpdated.sunday = false
      jobStore.personUpdated.bank_holidays = false
      jobStore.personUpdated.sat_sun_bh_only = true
    } else {
      jobStore.personUpdated.sat_sun_bh_only = false
    }
  }
}
function checkBankholidays(e) {
  if (e.target.checked) {// uncheck checkRemote
    if (jobStore.personUpdated.workdays == false && jobStore.personUpdated.saturday == 1 && jobStore.personUpdated.sunday == 1) {
      jobStore.personUpdated.saturday = false
      jobStore.personUpdated.sunday = false
      jobStore.personUpdated.bank_holidays = false
      jobStore.personUpdated.sat_sun_bh_only = true
    } else {
      jobStore.personUpdated.sat_sun_bh_only = false
    }
  }
}
/* *******************************************************
// investigate cases of checkboxes hours
**********************************************************/
function checkNormalhours(e) {
  if (e.target.checked) {
    jobStore.personUpdated.nightshift_only = false
    jobStore.personUpdated.other_shift_only = false
  } else if (jobStore.personUpdated.other_shift_only == 0) {
    jobStore.personUpdated.nightshift = true
  }
}
function checkNightshiftonly(e) {
  if (e.target.checked) {
    jobStore.personUpdated.normal_hours = false
    jobStore.personUpdated.nightshift = true
    jobStore.personUpdated.other_shift = false
    jobStore.personUpdated.other_shift_only = false
  }
}
function checkOthershift(e) {
  if (e.target.checked) {
    jobStore.personUpdated.nightshift_only = false
    if (jobStore.personUpdated.normal_hours == 0 && jobStore.personUpdated.nightshift == 0) {
      jobStore.personUpdated.other_shift_only = true
    }

  } else if (jobStore.personUpdated.nightshift == 1) {
    jobStore.personUpdated.nightshift_only = true
  }
}
function checkOthershiftonly(e) {
  if (e.target.checked) {
    jobStore.personUpdated.other_shift = true
    jobStore.personUpdated.nightshift = false
    jobStore.personUpdated.nightshift_only = false
    jobStore.personUpdated.normal_hours = false
  }
}
function checkNightshift(e) {
  if (e.target.checked) {
    jobStore.personUpdated.other_shift_only = false
    if (jobStore.personUpdated.normal_hours == 0 && jobStore.personUpdated.other_shift == 0) {
      jobStore.personUpdated.nightshift_only = true
    }
  } else if (jobStore.personUpdated.other_shift == 1) {
    jobStore.personUpdated.other_shift_only = true
  } else if (jobStore.personUpdated.normal_hours == 1) {
    jobStore.personUpdated.nightshift_only = false
  }
}


</script>

<style scoped>
#myGridContainer {
  width: fit-content;
  display: grid;
  grid-template-columns: 1fr;
  gap: 35px;
}
@media (min-width: 600px) {
  .myGridContainer {
    width: fit-content;
    display: grid;
    grid-template-columns: 2fr 2fr 2fr 2fr;
    gap: 35px;
  }
}
.myGridColumn {
  padding: 1vw;
  min-width: 200px;
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