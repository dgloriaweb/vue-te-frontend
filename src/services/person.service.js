import axios from 'axios'
import { useStore } from '@/store/index'
import authService from './auth.service'

class PersonService {
  updatePerson = async (person) => {
    const store = useStore()
    try {
      const url = process.env.VUE_APP_API_URL + '/api/people/' + person.id
      const response = await axios.post(url, {
        headers: authService.getApiHeaders,
        params: {
          userId: store.userId,
          person,
        },
      })
      return response
    } catch (error) {
      alert ('error in updatePerson: '. error)
    }
  }
}
export default new PersonService()
