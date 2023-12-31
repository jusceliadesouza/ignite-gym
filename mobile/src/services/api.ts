import axios, { AxiosInstance } from 'axios'

import { AppError } from '@utils/AppErrors'
import { storageAuthTokenGet } from '@storage/storageAuthToken'

type SignOut = () => void

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManage: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: 'http://192.168.0.4:3333'
}) as APIInstanceProps

api.registerInterceptTokenManage = signOut => {
<<<<<<< HEAD
  const interceptTokenManage = api.interceptors.request.use(response => response, async (requestError) => {
    if (requestError?.response?.status === 401) {
      if (requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {
        const { refreshToken } = await storageAuthTokenGet()

        if(!refreshToken) {
          signOut()
          return Promise.reject(requestError)
        }
=======
  const interceptTokenManage = api.interceptors.request.use(response => response, requestError => {
    if (requestError?.response?.status === 401) {
      if (requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {
        
>>>>>>> 0687b1c9a03a24cf7cffea93b79e7ebabd667606
      }

      signOut()
    }

    if (requestError.response && requestError.response.data) {
      return Promise.reject(new AppError(requestError.response.data.message))
    } else {
      return Promise.reject(requestError)
    }
  })

  return () => {
    api.interceptors.response.eject(interceptTokenManage)
  } 
}

export { api }