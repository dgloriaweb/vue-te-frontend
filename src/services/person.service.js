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

  getPersonSkills =  async () => {
    // let array = [
    //   {
    //     id: 86,
    //     person_id: 4,
    //     prop_link_id: 86,
    //     prop_link_type: 'skill',
    //     user_id: 10,
    //     skill: 'PHP',
    //     skill_type: 'job_type',
    //   },
    //   {
    //     id: 63,
    //     person_id: 4,
    //     prop_link_id: 63,
    //     prop_link_type: 'skill',
    //     user_id: 10,
    //     skill: 'JavaScript',
    //     skill_type: 'job_type',
    //   },
    // ]
    // return array
    try {
      const url = process.env.VUE_APP_API_URL + '/api/showSkills'
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
