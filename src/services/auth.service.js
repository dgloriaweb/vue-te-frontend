import axios from 'axios'
import { useStore } from '@/store/index'

class AuthService {
  getApiHeaders() {
    const store = useStore()
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers':'X-Requested-With, Content-Type, X-Token-Auth, Authorization',
      Authorization: 'Bearer ' + store.access_token
    }
  }
  login(user) {
    const store = useStore()
    const headers = {
      grant_type: 'client_credentials',
      client_id: process.env.VUE_APP_CLIENT_ID,
      client_secret: process.env.VUE_APP_CLIENT_SECRET,
      // name: user.name,
      name: '',
      email: user.email,
      password: user.password,
      password_confirmation: user.password,
    }
    return axios
      .post(process.env.VUE_APP_API_URL + '/api/login', headers)
      .then((response) => {
        if (response.data.token) {
          var userCredentials = JSON.stringify(response.data)
          store.setUserInLocalStore(userCredentials)
        }
        setTimeout(store.initialiseComponents(),500)
      })
      .catch((error) => {
        if (error?.response?.data?.errors) {
          alert(error.response.data.errors)
        } else {
          console.log('unhandled error: '.error)
        }
      })
  }
  logout() {
    const store = useStore()
    store.logout()
  }
  register(user) {
    const store = useStore()
    const headers = {
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password,
    }
    return axios
      .post(process.env.VUE_APP_API_URL + '/api/register', headers)
      .then((response) => {
        if (response.data.token) {
          alert('registration successful')
          var userCredentials = JSON.stringify(response.data)
          setTimeout(store.setUserInLocalStore(userCredentials),500)
        }
        return response
      })
      .catch((error) => {
        if (error?.response?.data?.errors) {
          alert(error.response.data.errors)
        } else {
          console.log('unhandled error: '.error)
        }
      })
  }
  resetPassword(user) {
    const headers = {
      grant_type: 'client_credentials',
      client_id: process.env.VUE_APP_CLIENT_ID,
      client_secret: process.env.VUE_APP_CLIENT_SECRET,
      name: user.name,
      email: user.email,
    }
    return axios
      .post(process.env.VUE_APP_API_URL + '/api/resetPassword', headers)
      .then((response) => {
        return response
      })
      .catch((error) => {
        if (error?.response?.data?.errors) {
          alert(error.response.data.errors)
        } else {
          console.log('unhandled error: '.error)
        }
      })
  }
}
export default new AuthService()
