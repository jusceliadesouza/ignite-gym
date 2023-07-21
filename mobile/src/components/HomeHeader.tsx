import { TouchableOpacity } from "react-native";
import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { MaterialIcons } from '@expo/vector-icons'

import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";

import defaultUserPhotoImg from '@assets/userPhotoDefault.png'

import { UserPhoto } from "./UserPhoto";

export function HomeHeader() {
  const { user, signOut } = useAuth()

  return (
    <HStack
      pt={16} 
      pb={5} 
      px={8} 
      bg="gray.600" 
      alignItems="center"
    >
      <UserPhoto 
        source={
          user.avatar 
          ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } 
          : defaultUserPhotoImg
        }
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

      <TouchableOpacity onPress={signOut}>
        <Icon 
          as={MaterialIcons}
          name="logout"
          color="gray.200"
          size={7}
        />
      </TouchableOpacity>
    </HStack>

  )
}