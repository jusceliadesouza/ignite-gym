import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { MaterialIcons } from '@expo/vector-icons'

import { UserPhoto } from "./UserPhoto";
import { useAuth } from "@hooks/useAuth";

export function HomeHeader() {
  const { user } = useAuth()
  return (
    <HStack
      pt={16} 
      pb={5} 
      px={8}
      bg="gray.600" 
      alignItems="center"
    >
      <UserPhoto 
        source={{ uri: 'https://github.com/jusceliadesouza.png'}}
        size={16}
        mr={4}
        alt="Imagem do usuário"
      />
      
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá, 
        </Text>
        
        <Heading 
          color="gray.100" 
          fontSize="md" 
          fontFamily="heading"
        >
          {user.name}
        </Heading>
      </VStack>

      <Icon 
        as={MaterialIcons}
        name="logout"
        color="gray.200"
        size={7}
      />
    </HStack>

  )
}