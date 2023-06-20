import { Heading, HStack, Text, VStack } from "native-base";

export function HomeHeader() {
  return (
    <HStack 
      pt={16} 
      pb={5} 
      px={8}
      bg="gray.600" 
      alignItems="center"
    >
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