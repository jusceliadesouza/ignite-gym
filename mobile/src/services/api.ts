import axios, { AxiosInstance } from 'axios'

import { AppError } from '@utils/AppErrors'

type SignOut = () => void

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManage: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: 'http://192.168.0.68:3333'
}) as APIInstanceProps

api.registerInterceptTokenManage = signOut => {
  const interceptTokenManage = api.interceptors.request.use(response => response, error => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message))
    } else {
      return Promise.reject(error)
    }
  })

  return () => {
    api.interceptors.response.eject(interceptTokenManage)
  } 
}

export { api }