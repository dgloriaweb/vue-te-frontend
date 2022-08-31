//stores/users.js

import personService from '@/services/person.service'
import skillService from '@/services/skill.service'
import { defineStore } from 'pinia'

// always rename the defineStore because it can cause disambiguity if names are the same
export const useSkillStore = defineStore('skills', {
  state: () => ({
    userSkills: null,
    skills: null, //all available skills
    skillsArray: null, //all skills into array
    userSkillsArray: null //all skills into array
  }),
  getters: {
    getUserSkills(state) {
      return state.userSkills
    },
    getSkills(state) {
      return state.skills
    },
    getUserSkillsArray(state) {
      return state.userSkillsArray
    },
    getSkillsArray(state) {
      return state.skillsArray
    },
  },
  actions: {
    setUserSkills() {
      personService.getPersonSkills().then((response) => {
        this.userSkills = response.data
        this.userSkillsArray = response.data
      })
    },
    unsetUserSkills() {
      this.userSkill = null
      //also clear it from the cache
    },

    //all skills
    setSkills() {
      skillService.getSkillsGrouped().then((response) => {
        if(response.data){
          this.skills = response.data
          this.skillsArray = response.data
        }
      })
    },
  },
})
