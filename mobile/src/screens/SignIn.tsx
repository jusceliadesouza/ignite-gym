import { VStack, Image  } from 'native-base'

import BackgroundImage from '@assets/background.png' 

export function SignIn() {
  return (
    <VStack flex={1} bg="gray.700">
      <Image 
        source={BackgroundImage}
        alt='Duas pessoas treinando'
        resizeMode='contain'
        position='absolute'
      />
    </VStack>
  )
}