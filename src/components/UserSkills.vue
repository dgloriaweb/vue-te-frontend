<template>
  <div id="container" class="wrapper">
    <div id="left-side">
      <div @click="routeHome" class="btn btn_primary">
        Save and return home
      </div>
      <h1>All Skills</h1>
      <div id="skillWrapper">
        <div v-for="(value, key) in skillStore.skills" :key="key">
          <div>
            <b>{{ key }}</b>
          </div>
          <div v-for="skill in value" :key="skill.id" id="skillLoop" style="display: inline-grid">
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
        <div v-for="userSkill in skillStore.userSkills" :key="userSkill.prop_link_id" style="display: inline-grid">
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
  // var mySkills = skillStore.userSkills.values();
  // console.log(typeof mySkills);
  // var mySkillsList = ""

  // for (const value of mySkills) {
  //   if (mySkillsList != "") {
  //     mySkillsList += ","
  //   }
  //   // make an array of the list 
  //   const idArray = mySkillsList.split(',').map(id => id.trim());
  //   // if the list already has the id, then don't add it
  //   const skillIdExists = idArray.includes(value["id"].toString());
  //   if (!skillIdExists) {
  //     mySkillsList += (value["id"]);
  //   }
  // }

  // v2
  // Save data to backend
  // Get the skill IDs that are still available
  const mySkills = Array.from(skillStore.userSkills.values());

  // Create a set to store unique skill IDs
  const uniqueSkillIds = new Set();

  for (const value of mySkills) {
    // Add the ID to the set
    uniqueSkillIds.add(value["id"].toString());
  }

  // Convert the set back to a comma-separated string
  const mySkillsList = Array.from(uniqueSkillIds).join(',');
  // don't send api requests if the list is empty
  if (!mySkillsList) {
    alert("Please select a skill from the list")
    return false
  }
  personService.updateUserSkills(store.person, mySkillsList)
  store.initialiseComponents()

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
  skillStore.userSkills.push(object)

  //remove item from skills
  var myItem = Object.entries(skillStore.skills).find((item) => item.includes(key)) // find items in this core skill category
  skillStore.skills[key] = Object.values(myItem[1]).filter((item) => item["id"] != skill["id"]); // filter out the selected one and return remaining

}
function removeSkill(userSkill) {
  console.log(userSkill)
  var object = {
    "id": userSkill["id"],
    "skill": userSkill["skill"],
    "core_skill": userSkill['core_skill']
  }
  // filter out object with this skill id
  skillStore.userSkills = Object.values(skillStore.userSkills).filter((item) => item["id"] != userSkill["id"])

  // TODO: this breaks the code, need to test how the core_skill can be eliminated
  // find the corresponding core_skill in the skills
  // add these data as array item to the skills 
  // var object = {
  //   "id": userSkill["id"],
  //   "skill": userSkill["skill"]
  // }
  // 14 has no core skill! Need to fix those which don't have a core skill
  // skillStore.skills[userSkill["core_skill"]].push(object)

  // add back this skill to the list on the left side
  skillStore.skills[userSkill['core_skill']].push(object);

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