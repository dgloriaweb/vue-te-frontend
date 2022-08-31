<template>
  <div id="container" class="wrapper">
    <div id="left-side">
      <button @click="routeHome" class="btn btn_primary">
        Save and return home
      </button>
      <h1>All Skills</h1>
      <div id="skillWrapper">
        <div v-for="(value, key) in skillStore.skillsArray" :key="key">
          <div>
            <b>{{ key }}</b>
          </div>
          <div
            v-for="skill in value"
            :key="skill.id"
            id="skillLoop"
            style="display: inline-grid"
          >
            <div class="myBtn" @click="addSkill(key, skill)">
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
          v-for="userSkill in skillStore.userSkillsArray"
          :key="userSkill.prop_link_id"
          style="display: inline-grid"
        >
          <div>
            <div class="myBtn" @click="removeSkill(userSkill)">
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
import { useRouter } from 'vue-router'

const route = useRouter()
const skillStore = useSkillStore()
const store = useStore()

function routeHome() {
  // save data to backend
  // get the skill id's that are still available
  var mySkills = skillStore.userSkillsArray.values();
  var mySkillsList = ""
  for (const value of mySkills) {
    if (mySkillsList != "") {
      mySkillsList += ","
    }
    mySkillsList += (value["id"]);
  }
  personService.updateUserSkills(store.person, mySkillsList)
  route.push('/')
}

/* *************************************
this part is tricky, handle with care!!! 
************************************* */
function addSkill(key, skill) {

  var object = {
    "id": skill["id"],
    "skill": skill["skill"],
    "core_skill": key
  }
  skillStore.userSkillsArray.push(object)

  //remove item from skillsArray
  var myItem = Object.entries(skillStore.skillsArray).find((item) => item.includes(key)) // find items in this core skill category
  skillStore.skillsArray[key] = Object.values(myItem[1]).filter((item) => item["id"] != skill["id"]); // filter out the selected one and return remaining

}
function removeSkill(userSkill) {
  console.log(userSkill["id"])
  // filter out object with this skill id
  skillStore.userSkillsArray = Object.values(skillStore.userSkillsArray).filter((item) => item["id"] != userSkill["id"])

  // find the corresponding core_skill in the skillsArray
  // add these data as array item to the skillsArray 
  var object = {
    "id": userSkill["id"],
    "skill": userSkill["skill"]
  }
  skillStore.skillsArray[userSkill["core_skill"]].push(object)
}
/* *************************************
this part is tricky, handle with care!!!
************************************* */



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