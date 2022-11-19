<template>
  <div class="wrapper">
    <h1>Edit Job preferences</h1>
    <div class="myGridContainer">
<!--    <h1>{{ jobStore.job.job_name }}</h1>-->
      <div class="myGridColumn">
        <MainCardComponent
            @show-modal-func="showModalFunc"
            data-route="editJob"
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
  </div>
</template>

<script setup>
import { useJobStore } from '../store/jobstore'
// import jobService from '../services/job.service'
import ModalComponent from '@/components/ModalComponent'
import { ref } from 'vue'
// import { onMounted } from 'vue'
// import { useRoute } from 'vue-router'
import MainCardComponent from "@/components/MainCardComponent";

const jobStore = useJobStore()
// const route = useRoute()

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
  console.log('job')
  console.log(jobStore.editJob)


  // jobService.setJob(jobStore.job).then(
  //   (response) => {
  //     if (response.status == 223) {
  //       alert(response.data)
  //     }
  //     else if (response.status != 200) {
  //       alert('unhandled error');
  //     }
  //     else {
  //       // alert('settings updated')
  //       hideModal()
  //       // change modal and show confirm message
  //       // update rates
  //       jobStore.setJobSummaryData()
  //     }
  //   })
  //   .catch(error => {
  //     if (error.response.data.errors) {
  //       alert(error.response.data.errors);
  //     } else {
  //       alert('unhandled error');
  //     }
  //   })
}

// onMounted(() => {
//   jobStore.setJob(route.params.id)
// })

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
