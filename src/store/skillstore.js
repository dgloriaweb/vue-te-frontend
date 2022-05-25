//stores/users.js

import { defineStore } from 'pinia'
// import personService from '@/services/person.service';

// always rename the defineStore because it can cause disambiguity if names are the same
export const useSkillStore = defineStore('skills', {
  state: () => ({
    skill: null,
  }),
  getters: {
    getSkill(state) {
      return state.skill
    },
  },
  actions: {
    unsetskill() {
      this.skill = null
      //also clear it from the cache
    },
  },
})
