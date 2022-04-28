//stores/users.js

import { defineStore } from 'pinia'
// always rename the defineStore because it can cause disambiguity if names are the same
export const useStore = defineStore("main", {
    state: () => ({
        isLoggedIn:false
    }),
    getters: {
    },
    actions: {
      checkLoggedInStatus(){
        if ( localStorage.getItem('user')){
          this.isLoggedIn = true
        }
      },
      logout(){
        localStorage.removeItem('user')
        this.isLoggedIn = false
      }
    },
})