import { ReactNode, createContext, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
  user: UserDTO
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({
  
} as AuthContextDataProps) 

export function AuthContextProvider({ children }: AuthContextProviderProps ) {
  const [user, setUse] = useState({
    id: '1',
    name: 'Juscélia de Souza',
    email: 'jusceliadesouza@gmail.com',
    avatar: 'juscelia.png'
  })

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}