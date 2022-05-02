//stores/users.js

import { defineStore } from 'pinia'
// always rename the defineStore because it can cause disambiguity if names are the same
export const useStore = defineStore('main', {
  state: () => ({
    isLoggedIn: false,
    userId: null,
    access_token: null,
    storedUser: null,
  }),
  getters: {
    getLoginState(state) {
      return state.isLoggedIn
    },
    getUserId(state) {
      return state.userId
    },
    getStoredUser(state) {
      state.storedUser = localStorage.getItem('user')
      return state.storedUser
    },
    getAccessToken(state) {
      return state.access_token
    },
  },
  actions: {
    checkLoggedInStatus() {
      this.getStoredUser
      // var storedUser = localStorage.getItem('user')
      if (this.storedUser) {
        // set user as logged in
        // setup user id and token
        this.userId = JSON.parse(this.storedUser)['userId']
        this.access_token = JSON.parse(this.storedUser)['token']
        // we need to validate the received token with an api request, 
        // since localStorage can be hacked
        // need to do a simple user exists request
        if (this.access_token) {
          this.isLoggedIn = true
        }
      }
    },
    setUserInLocalStore(userdata) {
      localStorage.setItem('user', userdata)
      this.checkLoggedInStatus()
    },
    logout() {
      localStorage.removeItem('user')
      this.isLoggedIn = false
    },
  },
})
