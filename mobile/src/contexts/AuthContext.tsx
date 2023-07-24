import { ReactNode, createContext, useEffect, useState } from "react";

import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from '@storage/storageAuthToken' 
import { storageUserGet, storageUserRemove, storageUserSave } from "@storage/storageUser";

import { api } from '@services/api'
import { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
  user: UserDTO
  signIn: (email: string, password: string) => Promise<void>
  updateUserProfile: (userUpdate: UserDTO) => Promise<void>
  signOut: () => Promise<void>
  isLoadingUserStorageData: boolean
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({
  
} as AuthContextDataProps) 

export function AuthContextProvider({ children }: AuthContextProviderProps ) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData)
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string, refreshToken: string) {
    try {
      setIsLoadingUserStorageData(true)

      await storageUserSave(userData)
      await storageAuthTokenSave({ token, refreshToken })  
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(true)
    }
  } 

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })
  
      if (data.user && data.token && data.refreshToken) {
        await storageUserAndTokenSave(data.user, data.token, data.refreshToken)
        userAndTokenUpdate(data.user, data.token)
      }
    }
    catch(error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  } 

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)
      setUser({} as UserDTO)

      await storageUserRemove()
      await storageAuthTokenRemove()      
    } catch (error) {
      throw error
    }finally {
      setIsLoadingUserStorageData(false)
    }
  } 

  async function updateUserProfile(userUpdate: UserDTO) {
    try {
      setUser(userUpdate)

      await storageUserSave(userUpdate)
    } catch (error) {
      throw error
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true)

      const userLogged  = await storageUserGet()
      const { token } = await storageAuthTokenGet()
  
      if(token && userLogged) {
        userAndTokenUpdate(userLogged, token)
      }      
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManage(signOut)

    return () => {
      subscribe()
    }
  }, [signOut])

  return (
    <AuthContext.Provider value={{ 
      user, 
      signIn,
      updateUserProfile,
      signOut,
      isLoadingUserStorageData
    }}>
      {children}
    </AuthContext.Provider>
  )
}