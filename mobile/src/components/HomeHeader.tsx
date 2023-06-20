import { Heading, HStack, Text, VStack } from "native-base";
import { UserPhoto } from "./UserPhoto";

export function HomeHeader() {
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
      
      <VStack>
        <Text color="gray.100" fontSize="md">
          Olá, 
        </Text>
        
        <Heading color="gray.100" fontSize="md">
          Juscélia
        </Heading>
      </VStack>
    </HStack>

  )
}