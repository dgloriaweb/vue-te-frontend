import axios from 'axios'
import { useStore } from '@/store/index'
import authService from './auth.service'

class PersonService {
  // getters
  getPersonSkills = async () => {
    const store = useStore()
    try {
      const url =
        process.env.VUE_APP_API_URL + '/api/showSkills/' + store.userId
      const response = await axios.get(url, {
        headers: authService.getApiHeaders(),
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }
  getPersonByUserId = async () => {
    const store = useStore()
    try {
      const url = process.env.VUE_APP_API_URL + '/api/people/' + store.userId
      const response = await axios.get(url, {
        headers: authService.getApiHeaders(),
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }

  //setters
  updatePerson = async (person) => {
    const store = useStore()
    try {
      const url = process.env.VUE_APP_API_URL + '/api/people/' + person.id
      const response = await axios({
        method: 'post',
        url: url,
        headers: authService.getApiHeaders(),
        params: {
          userId: store.userId,
          person,
        },
      })
      return response
    } catch (error) {
      alert('error in updatePerson: '.error)
    }
  }

  updateUserSkills = async (person, skillIdArray) => {
    try {
      const url = process.env.VUE_APP_API_URL + '/api/addPersonSkill/' + person.id + '/' + skillIdArray
      const response = await axios({
        method: 'post',
        url: url,
        headers: authService.getApiHeaders(),

      })
      return response
    } catch (error) {
      alert('error in updateSkills: '.error)
    }
  }


}
export default new PersonService()
