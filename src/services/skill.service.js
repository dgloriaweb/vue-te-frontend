import axios from 'axios'
import { useStore } from '@/store/index'
import authService from './auth.service'

class SkillService {
  getSkillsGrouped = async () => {
    const store = useStore()
    try {
      // http://127.0.0.1:8000/api/showSkillsGrouped/9
      const url =
        process.env.VUE_APP_API_URL + '/api/showSkillsGrouped/' + store.userId
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
