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
  console.log(mySkillsList);
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
  // Initialize userSkills as array if it's null or not an array
  if (!skillStore.userSkills || !Array.isArray(skillStore.userSkills)) {
    skillStore.userSkills = [];
  }

  // Check if this skill is already in userSkills (handles many-to-many: skill might be in multiple groups)
  const skillAlreadyAdded = skillStore.userSkills.some(item => item["id"] === skill["id"])
  
  if (!skillAlreadyAdded) {
    var object = {
      "id": skill["id"],
      "skill": skill["skill"],
      "core_skill": key
    }
    skillStore.userSkills.push(object)
  }

  //remove item from skills (only from the specific core_skill group clicked)
  // This handles the case where skill appears in multiple groups - we only remove from the one clicked
  var myItem = Object.entries(skillStore.skills).find((item) => item.includes(key)) // find items in this core skill category
  if (myItem && myItem[1]) {
    skillStore.skills[key] = Object.values(myItem[1]).filter((item) => item["id"] != skill["id"]); // filter out the selected one and return remaining
  }
}
function removeSkill(userSkill) {
  // Remove the skill from userSkills (right-hand list)
  skillStore.userSkills = Object.values(skillStore.userSkills).filter((item) => item["id"] != userSkill["id"])

  // Use masterSkills to find ALL core_skill groups this skill originally belonged to
  // (handles many-to-many relationship)
  if (skillStore.masterSkills) {
    const skillObject = {
      "id": userSkill["id"],
      "skill": userSkill["skill"]
    }

    // Loop through all core_skill groups in the master copy
    for (const [coreSkillKey, skillsArray] of Object.entries(skillStore.masterSkills)) {
      // Check if this skill exists in this core_skill group in the master copy
      const skillExistsInMaster = skillsArray.some(skill => skill.id === userSkill["id"])
      
      if (skillExistsInMaster) {
        // Initialize the group in working skills if it doesn't exist
        if (!skillStore.skills[coreSkillKey]) {
          skillStore.skills[coreSkillKey] = []
        }
        
        // Check if skill already exists in this group (avoid duplicates)
        const skillAlreadyExists = skillStore.skills[coreSkillKey].some(skill => skill.id === userSkill["id"])
        
        if (!skillAlreadyExists) {
          // Add the skill back to this core_skill group
          skillStore.skills[coreSkillKey].push(skillObject)
        }
      }
    }
  }
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