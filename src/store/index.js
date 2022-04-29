//stores/users.js

import { defineStore } from 'pinia'
// always rename the defineStore because it can cause disambiguity if names are the same
export const useStore = defineStore('main', {
  state: () => ({
    isLoggedIn: false,
    userId: null,
    access_token:null
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
    checkLoggedInStatus() {
      var storedUser = localStorage.getItem('user')

      if (storedUser) {
        // set user as logged in
        // setup user id and token
        this.userId = JSON.parse(storedUser)['userId']
        this.access_token = JSON.parse(storedUser)['token']
        if(this.access_token){
          this.isLoggedIn = true
        }
      }
    },
    logout() {
      localStorage.removeItem('user')
      this.isLoggedIn = false
    },
  },
})
