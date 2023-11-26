//stores/users.js

import personService from '@/services/person.service'
import skillService from '@/services/skill.service'
import { defineStore } from 'pinia'

// always rename the defineStore because it can cause disambiguity if names are the same
export const useSkillStore = defineStore('skills', {
  state: () => ({
    userSkills: null,
    skills: null, //all available skills,
    skill: null
  }),
  getters: {
    getUserSkills(state) {
      return state.userSkills
    },
    getSkills(state) {
      return state.skills
    },
    getSkill(state) {
      return state.skill
    },

  },
  actions: {
    setUserSkills() {
      personService.getPersonSkills().then((response) => {
        this.userSkills = response.data
      })
    },
    unsetUserSkills() {
      this.userSkill = null
      //also clear it from the cache
    },

    //all skills
    setSkills() {
      skillService.getSkillsGrouped().then((response) => {
        if (response.data) {
          this.skills = response.data
        }
      })
    },
    setSkill(id) {
      skillService
        .getSkillDetails(id)
        .then((response) => {
          this.skill = response.data
          
        })
        .catch((error) => {
          console.log(error)
        })
    },

  },
})
