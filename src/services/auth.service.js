import axios from 'axios'
import { useStore } from '@/store/index'
import router from '@/router'

class AuthService {
  getToken(){
    const store = useStore()
    return { Authorization: 'Bearer ' + store.access_token }
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
          alert("login successful")
            var userCredentials = JSON.stringify(response.data)
          store.setUserInLocalStore(userCredentials)
        }
        store.initialiseComponents
        router.push('/')
      })
      .catch((error) => {
        if (error.response.data.errors) {
          alert(error.response.data.errors);
        } else {
          console.log('unhandled error');
        }
      })
  }
  logout() {
    localStorage.removeItem('user')
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
        console.log(response)
        return response
      })
      .catch((error) => {
        console.log(error)
        return error.response
      })
  }
}
export default new AuthService()
