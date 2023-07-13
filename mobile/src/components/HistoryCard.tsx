import { HistoryDTO } from "@dtos/HistoryDTO";
import { HStack, Heading, Text, VStack } from "native-base";

type Props = {
  data: HistoryDTO
}

export function HistoryCard({ data }: Props) {
  return (
    <HStack 
      w="full" 
      px={5} 
      py={4} 
      mb={3} 
      bg="gray.600" 
      rounded="md" 
      alignItems="center" 
      justifyContent="space-between"
    >
      <VStack mr={5}>
        <Heading 
          flex={1}
          color="white" 
          fontSize="md"
          fontFamily="heading"
          textTransform="capitalize"
          numberOfLines={1}
        >
          {data.group}
        </Heading>

        <Text 
          color="gray.100" 
          fontSize="lg" 
          numberOfLines={1}
        >
          {data.name}
        </Text>

      </VStack>
      <Text
        color="gray.300"
        fontSize="md"  
      >
        {data.hour}
      </Text>
    </HStack>
  )
}