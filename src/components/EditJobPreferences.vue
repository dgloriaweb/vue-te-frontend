<template>
  <div class="wrapper">
    <div class="myGridContainer" v-if="jobStore.job">
      <h1>{{ jobStore.job.job_name }}</h1>
      <div class="myGridColumn" v-if="jobStore.job">
        <h3>Usual work location</h3>
        <input
          type="checkbox"
          class="form-check-input"
          name="workplace"
          id="workplaceChk"
          v-model="jobStore.job.workplace"
          @change="checkWorkplace"
        />
        <label for="workplaceChk">I want to work at the workplace</label>
        <br />
        <input
          type="checkbox"
          class="form-check-input"
          name="remote"
          id="remoteChk"
          v-model="jobStore.job.remote"
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
          v-model="jobStore.job.overtime"
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
          v-model="jobStore.job.workdays"
          @change="checkWorkdays"
        />
        <label for="workdaysChk">I want to work workdays</label>
        <br />
        <input
          type="checkbox"
          class="form-check-input"
          name="saturday"
          id="saturdayChk"
          v-model="jobStore.job.saturday"
          @change="checkSaturday"
        />
        <label for="saturdayChk">Can do Saturdays</label>
        <br />
        <input
          type="checkbox"
          class="form-check-input"
          name="sunday"
          id="sundayChk"
          v-model="jobStore.job.sunday"
          @change="checkSunday"
        />
        <label for="sundayChk">Can do Sundays</label>
        <br />
        <input
          type="checkbox"
          class="form-check-input"
          name="bank_holidays"
          id="bank_holidaysChk"
          v-model="jobStore.job.bank_holidays"
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
          v-model="jobStore.job.sat_sun_bh_only"
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
          v-model="jobStore.job.normal_hours"
          @change="checkNormalhours"
        />
        <label for="normal_hoursChk">Want to work normal hours</label>
        <br />
        <input
          type="checkbox"
          class="form-check-input"
          name="nightshift"
          id="nightshiftChk"
          v-model="jobStore.job.nightshift"
          @change="checkNightshift"
        />
        <label for="nightshiftChk">Can do nightshift</label>
        <br />
        <input
          type="checkbox"
          class="form-check-input"
          name="other_shift"
          id="other_shiftChk"
          v-model="jobStore.job.other_shift"
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
          v-model="jobStore.job.nightshift_only"
          @change="checkNightshiftonly"
        />
        <label for="nightshift_onlyChk">Want to do nightshift only</label>
        <br />
        <input
          type="checkbox"
          class="form-check-input"
          name="other_shift_only"
          id="other_shift_onlyChk"
          v-model="jobStore.job.other_shift_only"
          @change="checkOthershiftonly"
        />
        <label for="other_shift_onlyChk"
          >Want to do other shift only (eg. late afternoons)</label
        >
        <br />
        <br />
        <button id="show-modal" class="btn btn_primary" @click="showModalFunc">
          Store settings
        </button>
        <div style="line-height: 0.5rem">&nbsp;</div>
        <router-link :to="{ name: 'homePage' }" class="btn btn_secondary"
          >Return to results</router-link
        >
      </div>
    </div>
    Blabla
    <div class="">
      <MainCardComp
        @show-modal-func="showModalFunc"
        data-route="job"
      />
    </div>
    <ModalComponent
      :show="showModal"
      :modalBody="modalBodyText"
      :modalHeader="modalHeaderText"
      @close="hideModal"
      @submitModal="confirmJobSettingChanges()"
    />
  </div>
</template>

<script setup>
import { useJobStore } from '@/store/jobstore'
import jobService from '@/services/job.service'
import ModalComponent from '@/components/ModalComponent'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { MainCardComp } from '@/components/MainCardComp'

const jobStore = useJobStore()
const route = useRoute()

let showModal = ref(false)
let modalHeaderText = "Confirm Changes"
let modalBodyText = "These changes will be submitted:"

function hideModal() {
  showModal.value = false
}
function showModalFunc() {
  showModal.value = true
}
function confirmJobSettingChanges() {
  // validation here
  storeJobPreferencesData()
}


function storeJobPreferencesData() {
  jobService.setJob(jobStore.job).then(
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
    jobStore.job.remote = false
  }
}
function checkRemote(e) {
  if (e.target.checked) {
    jobStore.job.workplace = false
  }
}

/* *******************************************************
// investigate cases of checkboxes days
**********************************************************/
function checkSatsunbhonly(e) {
  if (e.target.checked) {
    jobStore.job.workdays = false
    jobStore.job.saturday = false
    jobStore.job.sunday = false
    jobStore.job.bank_holidays = false
  } else {
    jobStore.job.workdays = true
  }
}
function checkWorkdays(e) {
  if (e.target.checked) {
    jobStore.job.sat_sun_bh_only = false
  } else {
    if (jobStore.job.saturday == 1 && jobStore.job.sunday == 1 && jobStore.job.bank_holidays == 1) {
      jobStore.job.saturday = false
      jobStore.job.sunday = false
      jobStore.job.bank_holidays = false
      jobStore.job.sat_sun_bh_only = true
    }
  }
}
function checkSaturday(e) {
  if (e.target.checked) {
    if (jobStore.job.workdays == false && jobStore.job.sunday == 1 && jobStore.job.bank_holidays == 1) {
      jobStore.job.saturday = false
      jobStore.job.sunday = false
      jobStore.job.bank_holidays = false
      jobStore.job.sat_sun_bh_only = true
    } else {
      jobStore.job.sat_sun_bh_only = false
    }
  }
}
function checkSunday(e) {
  if (e.target.checked) {
    if (jobStore.job.workdays == false && jobStore.job.saturday == 1 && jobStore.job.bank_holidays == 1) {
      jobStore.job.saturday = false
      jobStore.job.sunday = false
      jobStore.job.bank_holidays = false
      jobStore.job.sat_sun_bh_only = true
    } else {
      jobStore.job.sat_sun_bh_only = false
    }
  }
}
function checkBankholidays(e) {
  if (e.target.checked) {// uncheck checkRemote
    if (jobStore.job.workdays == false && jobStore.job.saturday == 1 && jobStore.job.sunday == 1) {
      jobStore.job.saturday = false
      jobStore.job.sunday = false
      jobStore.job.bank_holidays = false
      jobStore.job.sat_sun_bh_only = true
    } else {
      jobStore.job.sat_sun_bh_only = false
    }
  }
}
/* *******************************************************
// investigate cases of checkboxes hours
**********************************************************/
function checkNormalhours(e) {
  if (e.target.checked) {
    jobStore.job.nightshift_only = false
    jobStore.job.other_shift_only = false
  } else if (jobStore.job.other_shift_only == 0) {
    jobStore.job.nightshift = true
  }
}
function checkNightshiftonly(e) {
  if (e.target.checked) {
    jobStore.job.normal_hours = false
    jobStore.job.nightshift = true
    jobStore.job.other_shift = false
    jobStore.job.other_shift_only = false
  }
}
function checkOthershift(e) {
  if (e.target.checked) {
    jobStore.job.nightshift_only = false
    if (jobStore.job.normal_hours == 0 && jobStore.job.nightshift == 0) {
      jobStore.job.other_shift_only = true
    }

  } else if (jobStore.job.nightshift == 1) {
    jobStore.job.nightshift_only = true
  }
}
function checkOthershiftonly(e) {
  if (e.target.checked) {
    jobStore.job.other_shift = true
    jobStore.job.nightshift = false
    jobStore.job.nightshift_only = false
    jobStore.job.normal_hours = false
  }
}
function checkNightshift(e) {
  if (e.target.checked) {
    jobStore.job.other_shift_only = false
    if (jobStore.job.normal_hours == 0 && jobStore.job.other_shift == 0) {
      jobStore.job.nightshift_only = true
    }
  } else if (jobStore.job.other_shift == 1) {
    jobStore.job.other_shift_only = true
  } else if (jobStore.job.normal_hours == 1) {
    jobStore.job.nightshift_only = false
  }
}
onMounted(() => {
  jobStore.setJob(route.params.id)
})

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