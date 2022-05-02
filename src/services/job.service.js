import axios from 'axios'


class JobService {
  getJobDetails = async (job_id) => {
    var storageItem = localStorage.getItem('user')
    this.access_token = JSON.parse(storageItem)['token']
    if (this.access_token) {
      try {
        const url = process.env.VUE_APP_API_URL + '/api/jobs/' + job_id
        const response = await axios.get(url, { headers:  { Authorization: 'Bearer ' + this.access_token }, })
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
