<template>
  <div id="container">
    <div id="left-side">
      <h1>All Skills</h1>
      <div id="skillWrapper">
        <div v-for="(value, key) in skillStore.skills" :key="key">
          <div>
            <b>{{ key }}</b>
          </div>
          <div
            v-for="skill in value"
            :key="skill.id"
            id="skillLoop"
            style="display: inline-grid"
          >
            <div class="myBtn" @click="addSkill(skill.id)">
              {{ skill.skill }} <i class="fa fa-plus-circle"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="right-side">
      <h1>Your Skills</h1>
      <div id="skillWrapper">
        <div
          v-for="userSkill in skillStore.userSkills"
          :key="userSkill.id"
          style="display: inline-grid"
        >
          <div>
            <div class="myBtn" @click="removeSkill(userSkill.id)">
              {{ userSkill.skill }} <i class="fa fa-minus-circle"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 
</template>

<script setup>
import personService from '@/services/person.service';
import { useSkillStore } from '../store/skillstore'
import { useStore } from '@/store/index'
const skillStore = useSkillStore()
const store = useStore()


function addSkill(skill_id) {
  personService.addSkillToPerson(store.person,skill_id).then(
    (response) => {
      if (response.status == 223) {
        alert(response.data)
      }
      else if (response.status != 200) {
        alert('unhandled error');
      }
      else {
        alert('record added')
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
function removeSkill(skill_id) {
  console.log(skill_id);
}


</script>

<style lang="css" scoped>
#myGridContainer {
  width: fit-content;
  display: grid;
  grid-template-columns: 1fr;
  gap: 5px;
  border: 1px solid gray;
}
@media (min-width: 600px) {
  #myGridContainer {
    width: fit-content;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 5px;
  }
}
#myGridColumn {
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
.myBtn {
  padding: 5px 10px;
  border: 1px solid gray;
  background-color: lightgray;
  border-radius: 12px;
  width: fit-content;
}
#container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>