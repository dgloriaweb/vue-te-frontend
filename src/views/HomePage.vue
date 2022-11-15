<template>
  <div class="wrapper">
    <div v-if="!store.isLoggedIn">
      <h1>Find your true calling!</h1>
      <h2>
        TalentExploit is a tool to find your career path by selecting your
        skills, working condition preferences, certifications, habits, hobbies,
        wishes, hopes and dreams.
      </h2>
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
          <div v-if="store.userId == 8 || store.userId == 9">
            <router-link :to="{ name: 'addJob' }" class="btn btn_primary">
              Add job
            </router-link>
        </div>
      </div>

      <MainCardComponent
        style="display: contents"
        @show-modal-func="showModalFunc"
        data-route="personUpdated"
      />

        <router-link
          :to="{ name: 'userSkills' }"
          class="btn btn_primary"
          style="margin-bottom: 5vh"
        >
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
import { ref } from 'vue'
import MainCardComponent from "@/components/MainCardComponent";

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
