import axios from 'axios'
import authService from './auth.service'

class SkillService {
  getSkills = async () => {
    try {
      const url = process.env.VUE_APP_API_URL + '/api/skills'
      const response = await axios.get(url, {
        headers: authService.getApiHeaders(),
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }
}
export default new SkillService()
