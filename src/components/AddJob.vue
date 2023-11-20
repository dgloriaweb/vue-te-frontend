<template>
  <div class="wrapper">
    <div class="myGridContainer">
      <h1>
        Enter new job's name
        <input type="text" placeholder="Enter Name" v-model="job.job_name" />
      </h1>
      <div class="myGridColumn">
        <h3>Usual work location</h3>
        <input
          type="checkbox"
          class="form-check-input"
          name="workplace"
          id="workplaceChk"
          v-model="job.workplace"
          @change="checkWorkplace"
        />
        <label for="workplaceChk">I want to work at the workplace</label>
        <br />
        <input
          type="checkbox"
          class="form-check-input"
          name="remote"
          id="remoteChk"
          v-model="job.remote"
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
          v-model="job.overtime"
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
          v-model="job.workdays"
          @change="checkWorkdays"
        />
        <label for="workdaysChk">I want to work workdays</label>
        <br />
        <input
          type="checkbox"
          class="form-check-input"
          name="saturday"
          id="saturdayChk"
          v-model="job.saturday"
          @change="checkSaturday"
        />
        <label for="saturdayChk">Can do Saturdays</label>
        <br />
        <input
          type="checkbox"
          class="form-check-input"
          name="sunday"
          id="sundayChk"
          v-model="job.sunday"
          @change="checkSunday"
        />
        <label for="sundayChk">Can do Sundays</label>
        <br />
        <input
          type="checkbox"
          class="form-check-input"
          name="bank_holidays"
          id="bank_holidaysChk"
          v-model="job.bank_holidays"
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
          v-model="job.sat_sun_bh_only"
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
          v-model="job.normal_hours"
          @change="checkNormalhours"
        />
        <label for="normal_hoursChk">Want to work normal hours</label>
        <br />
        <input
          type="checkbox"
          class="form-check-input"
          name="nightshift"
          id="nightshiftChk"
          v-model="job.nightshift"
          @change="checkNightshift"
        />
        <label for="nightshiftChk">Can do nightshift</label>
        <br />
        <input
          type="checkbox"
          class="form-check-input"
          name="other_shift"
          id="other_shiftChk"
          v-model="job.other_shift"
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
          v-model="job.nightshift_only"
          @change="checkNightshiftonly"
        />
        <label for="nightshift_onlyChk">Want to do nightshift only</label>
        <br />
        <input
          type="checkbox"
          class="form-check-input"
          name="other_shift_only"
          id="other_shift_onlyChk"
          v-model="job.other_shift_only"
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
import { useJobStore } from '../store/jobstore'
import jobService from '../services/job.service'
import ModalComponent from '@/components/ModalComponent'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'


const route = useRouter()
const jobStore = useJobStore()
let job = reactive({
  workplace: false,
  remote: false,
  workdays: false,
  saturday: false,
  sunday: false,
  bank_holidays: false,
  sat_sun_bh_only: false,
  normal_hours: false,
  nightshift: false,
  nightshift_only: false,
  other_shift: false,
  other_shift_only: false,
  overtime: false,
})


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
  storeJob()
}


function storeJob() {
  jobService.createJob(job).then(
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
        route.push({ name: 'homePage' })

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
    job.remote = false
  }
}
function checkRemote(e) {
  if (e.target.checked) {
    job.workplace = false
  }
}

/* *******************************************************
// investigate cases of checkboxes days
**********************************************************/
function checkSatsunbhonly(e) {
  if (e.target.checked) {
    job.workdays = false
    job.saturday = false
    job.sunday = false
    job.bank_holidays = false
  } else {
    job.workdays = true
  }
}
function checkWorkdays(e) {
  if (e.target.checked) {
    job.sat_sun_bh_only = false
  } else {
    if (job.saturday == 1 && job.sunday == 1 && job.bank_holidays == 1) {
      job.saturday = false
      job.sunday = false
      job.bank_holidays = false
      job.sat_sun_bh_only = true
    }
  }
}
function checkSaturday(e) {
  if (e.target.checked) {
    if (job.workdays == false && job.sunday == 1 && job.bank_holidays == 1) {
      job.saturday = false
      job.sunday = false
      job.bank_holidays = false
      job.sat_sun_bh_only = true
    } else {
      job.sat_sun_bh_only = false
    }
  }
}
function checkSunday(e) {
  if (e.target.checked) {
    if (job.workdays == false && job.saturday == 1 && job.bank_holidays == 1) {
      job.saturday = false
      job.sunday = false
      job.bank_holidays = false
      job.sat_sun_bh_only = true
    } else {
      job.sat_sun_bh_only = false
    }
  }
}
function checkBankholidays(e) {
  if (e.target.checked) {// uncheck checkRemote
    if (job.workdays == false && job.saturday == 1 && job.sunday == 1) {
      job.saturday = false
      job.sunday = false
      job.bank_holidays = false
      job.sat_sun_bh_only = true
    } else {
      job.sat_sun_bh_only = false
    }
  }
}
/* *******************************************************
// investigate cases of checkboxes hours
**********************************************************/
function checkNormalhours(e) {
  if (e.target.checked) {
    job.nightshift_only = false
    job.other_shift_only = false
  } else if (job.other_shift_only == 0) {
    job.nightshift = true
  }
}
function checkNightshiftonly(e) {
  if (e.target.checked) {
    job.normal_hours = false
    job.nightshift = true
    job.other_shift = false
    job.other_shift_only = false
  }
}
function checkOthershift(e) {
  if (e.target.checked) {
    job.nightshift_only = false
    if (job.normal_hours == 0 && job.nightshift == 0) {
      job.other_shift_only = true
    }

  } else if (job.nightshift == 1) {
    job.nightshift_only = true
  }
}
function checkOthershiftonly(e) {
  if (e.target.checked) {
    job.other_shift = true
    job.nightshift = false
    job.nightshift_only = false
    job.normal_hours = false
  }
}
function checkNightshift(e) {
  if (e.target.checked) {
    job.other_shift_only = false
    if (job.normal_hours == 0 && job.other_shift == 0) {
      job.nightshift_only = true
    }
  } else if (job.other_shift == 1) {
    job.other_shift_only = true
  } else if (job.normal_hours == 1) {
    job.nightshift_only = false
  }
}


</script>

<style scoped>

.myGridColumn {
  padding: 1vw;
  min-width: 200px;
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