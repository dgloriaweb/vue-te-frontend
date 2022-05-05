import axios from 'axios'
import authService from './auth.service'
import { useStore } from '../store/index'

class JobService {
  getJobDetails = async (job_id) => {
    try {
      const url = process.env.VUE_APP_API_URL + '/api/jobs/' + job_id
      const response = await axios.get(url, {
        headers: authService.getApiHeaders(),
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }
  setJobSummaryData = async () => {
    try {
      const store = useStore()
      const url = process.env.VUE_APP_API_URL + '/api/home'
      const response = await axios.get(url, {
        headers: { Authorization: 'Bearer ' + store.access_token },
        params: {
          userId: store.userId,
        },
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }
}
export default new JobService()
