import axios from 'axios'
import authService from './auth.service'

class JobService {
  getJobDetails = async (job_id) => {
    try {
      const url = process.env.VUE_APP_API_URL + '/api/jobs/' + job_id
      const response = await axios.get(url, {
        headers: authService.getApiHeaders(),
      })
      return response
    } catch (error) {
      alert('error getting job details: '. error)
    }
  }
}

export default new JobService()
