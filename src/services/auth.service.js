import axios from 'axios'
import { useStore } from '@/store/index'
import { useRouter } from 'vue-router'

class AuthService {
  getApiHeaders() {
    const store = useStore()
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + store.access_token,
    }
  }
  login(user) {
    const route = useRouter()
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
          alert('login successful')
          var userCredentials = JSON.stringify(response.data)
          store.setUserInLocalStore(userCredentials)
        }
        store.initialiseComponents
        route.push('/')
      })
      .catch((error) => {
        if (error.response.data.errors) {
          alert(error.response.data.errors)
        } else {
          console.log('unhandled error')
        }
      })
  }
  logout() {
    const store = useStore()
    store.logout()
  }
  register(user) {
    const headers = {
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password,
    }
    return axios
      .post(process.env.VUE_APP_API_URL + '/api/register', headers)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
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
        return error.response
      })
  }
}
export default new AuthService()
