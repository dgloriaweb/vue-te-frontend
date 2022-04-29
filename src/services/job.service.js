import axios from 'axios'
import authHeader from './auth-header'

class JobService {
  getMyJobs = async () => {
    var storageItem = localStorage.getItem('user')
    this.access_token = JSON.parse(storageItem)['token']
    this.userId = JSON.parse(storageItem)['userId']
    if (this.access_token) {
      try {
        //api call to get jobs
        const url = process.env.VUE_APP_API_URL + '/api/home'
        const response = await axios.get(url, {
          headers: authHeader(),
          params: {
            userId: this.userId,
          },
        })
        return response
      } catch (error) {
        if (error.toString().includes('Network Error')) {
          console.log('true')
          return 'Network error'
        } else if (error.toString().includes('401')) {
          console.log(error)
          return '401'
        } else {
          return error
        }
      }
    } else {
      console.log('no token, relogin.')
    }
  }
  getJobDetails = async (job_id) => {
    var storageItem = localStorage.getItem('user')
    this.access_token = JSON.parse(storageItem)['token']
    if (this.access_token) {
      try {
        const url = process.env.VUE_APP_API_URL + '/api/jobs/' + job_id
        const response = await axios.get(url, { headers: authHeader() })
        return response
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('no token, relogin.')
    }
  }
}

export default new JobService()
