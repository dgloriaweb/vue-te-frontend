import axios from 'axios'

class PersonService {
  updatePerson = async (person) => {
    var storageItem = localStorage.getItem('user')
    this.access_token = JSON.parse(storageItem)['token']
    this.userId = JSON.parse(storageItem)['userId']
    if (this.access_token) {
      try {
        const url = process.env.VUE_APP_API_URL + '/api/people/' + person.id
        const response = await axios.post(url, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + this.access_token
          },
          params: {
            userId: this.userId,
            person,
          },
        })
        return response
        
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('no token, relogin.')
    }
  }
}
export default new PersonService()
