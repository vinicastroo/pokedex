import axios from 'axios'
const baseURL = 'https://pokeapi.co/api/v2'

const ApiClient = () => {
  const defaultOptions = {
    baseURL,
  }

  const instance = axios.create(defaultOptions)
  return instance
}

export default ApiClient()
