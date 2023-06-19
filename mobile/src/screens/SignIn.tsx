import { VStack, Image, Text, Center  } from 'native-base'

import LogoSvg from '@assets/logo.svg'
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

      <Center my={24}>
        <LogoSvg />

        <Text color="gray.100" fontSize="sm">
          Treine a sua mente e o seu corpo
        </Text>
      </Center>

    </VStack>
  )
}