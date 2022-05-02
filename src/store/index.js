import { defineStore } from 'pinia'
import { useJobStore } from '../store/jobstore'

// always rename the defineStore because it can cause disambiguity if names are the same
export const useStore = defineStore('main', {
  state: () => ({
    isLoggedIn: false,
    userId: null,
    access_token: null,
  }),
  getters: {
    getLoginState(state) {
      return state.isLoggedIn
    },
    getUserId(state) {
      return state.userId
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
    },
    setAccessToken() {
      let storedUser = JSON.parse(localStorage.getItem('user'))
      this.access_token = storedUser?.token
    },
    setUserId() {
      let storedUser = JSON.parse(localStorage.getItem('user'))
      this.userId = storedUser?.userId
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
