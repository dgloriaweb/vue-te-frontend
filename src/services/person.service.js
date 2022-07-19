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
      alert('error in updatePerson: '.error)
    }
  }
  addSkillToPerson = async (person, skillId) => {
    const store = useStore()
    try {
      const url =
        process.env.VUE_APP_API_URL +
        '/api/addPersonSkill/' +
        person.id + '/' +
        skillId
      const response = await axios.post(url, {
        headers: authService.getApiHeaders,
        params: {
          userId: store.userId,
          person,
         
        },
      })
      return response
    } catch (error) {
      alert('error in addSkillToPerson: '.error)
    }
  }

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
      const url =
        process.env.VUE_APP_API_URL + '/api/people/' + store.userId
      const response = await axios.get(url, {
        headers: authService.getApiHeaders(),
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }
}
export default new PersonService()
