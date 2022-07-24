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
    console.log(typeof person)
    try {
      const myurl = process.env.VUE_APP_API_URL + '/api/people/' + person.id
      const response = await axios({
        method: 'post',
        url: myurl,
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
  addSkillToPerson = async (person, skillId) => {
    try {
      const myurl =
        process.env.VUE_APP_API_URL +
        '/api/addPersonSkill/' +
        person.id +
        '/' +
        skillId
      const response = await axios({
        method: 'post',
        url: myurl,
        headers: authService.getApiHeaders(),
      })
      return response
    } catch (error) {
      alert('error in addSkillToPerson: '.error)
    }
  }
  removeSkillFromPerson = async (person, skillId) => {
    try {
      const myurl =
        process.env.VUE_APP_API_URL +
        '/api/removePersonSkill/' +
        person.id +
        '/' +
        skillId
      const response = await axios({
        method: 'post',
        url: myurl,
        headers: authService.getApiHeaders(),
      })
      return response
    } catch (error) {
      alert('error in removeSkillToPerson: '.error)
    }
  }
}
export default new PersonService()
