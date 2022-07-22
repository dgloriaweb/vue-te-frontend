import personService from '@/services/person.service'
import { defineStore } from 'pinia'
import { useJobStore } from '../store/jobstore'
import { useSkillStore } from './skillstore'

// always rename the defineStore because it can cause disambiguity if names are the same
export const useStore = defineStore('main', {
  state: () => ({
    isLoggedIn: false,
    userId: null,
    person: null,
    access_token: null,
  }),
  getters: {
    getLoginState(state) {
      return state.isLoggedIn
    },
    getUserId(state) {
      return state.userId
    },
    getPerson(state) {
      return state.person
    },
    getAccessToken(state) {
      return state.access_token
    },
  },
  actions: {
    initialiseComponents() {
      const jobStore = useJobStore()
      // clear job values
      jobStore.unsetJob()
      //check if user is still logged in
      this.setLoggedInStatus()
      if (this.isLoggedIn) {
        jobStore.setJobSummaryData()
      }

      //skills
      const skillStore = useSkillStore()
      //set user skills
      skillStore.setUserSkills()
      //set all skills
      skillStore.setSkills()
      // set person
      this.setPerson()
    },
    setAccessToken() {
      let storedUser = JSON.parse(localStorage.getItem('user'))
      this.access_token = storedUser?.token
    },
    setUserId() {
      let storedUser = JSON.parse(localStorage.getItem('user'))
      this.userId = storedUser?.userId
    },
    setPerson() {
      personService.getPersonByUserId().then((response) => {
        this.person = response.data
      })
    
    },
    setLoggedInStatus() {
      this.setAccessToken()
      this.setUserId()
      if (this.access_token) {
        this.isLoggedIn = true
      }
    },
    setUserInLocalStore(userdata) {
      localStorage.setItem('user', userdata)
      this.setLoggedInStatus()
    },
    logout() {
      localStorage.removeItem('user')
      this.isLoggedIn = false
    },
  },
})
