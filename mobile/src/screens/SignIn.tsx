import { VStack, Image, Text, Center, Heading  } from 'native-base'

import LogoSvg from '@assets/logo.svg'
import BackgroundImage from '@assets/background.png'

import { Button } from '@components/Button'
import { Input } from '@components/Input'

export function SignIn() {
  return (
    <VStack flex={1} bg="gray.700" px={10}>
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

      <Center>
        <Heading color="gray.100" fontSize="xl" mb={6} fontFamily='heading'>
          Acesse sua conta
        </Heading>

        <Input 
          placeholder='E-mail'
          keyboardType='email-address'
          autoCapitalize='none'
        />

        <Input 
          placeholder='Senha'
          secureTextEntry
        />

        <Button 
          title='Acessar'
        />
      </Center>

    </VStack>
  )
}