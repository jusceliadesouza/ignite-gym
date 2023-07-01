import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.0.4:3333'
})

api.interceptors.request.use((response) => {
  console.log('INTERCEPTOR RESPONSE => ', response)
  return response
}, (error) => {
  console.log('INTERCEPTOR RESPONSE ERROR => ', error)
  return Promise.reject(error)
})

export { api }