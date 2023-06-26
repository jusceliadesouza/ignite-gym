import { useNavigation } from '@react-navigation/native'
import { VStack, Image, Text, Center, Heading, ScrollView  } from 'native-base'

import LogoSvg from '@assets/logo.svg'
import BackgroundImage from '@assets/background.png'

import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { useState } from 'react'

export function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  function handleSignUp() {
    console.log({
      name,
      email,
      password,
      passwordConfirm
    })
  }

  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }} 
      showsVerticalScrollIndicator={false}
    >
      <VStack 
        flex={1} 
        px={10} 
        pb={16}
      >
        <Image 
          source={BackgroundImage}
          defaultSource={BackgroundImage}
          alt='Duas pessoas treinando'
          resizeMode='contain'
          position='absolute'
        />

        <Center my ={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine a sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily='heading'>
            Crie sua conta
          </Heading>

          <Input 
            placeholder='Nome'
            onChangeText={setName}
          />

          <Input 
            placeholder='E-mail'
            keyboardType='email-address'
            autoCapitalize='none'
            onChangeText={setEmail}
          />

          <Input 
            placeholder='Senha'
            secureTextEntry
            onChangeText={setPassword}
          />
          
          <Input 
            placeholder='Confirme a senha'
            secureTextEntry
            onChangeText={setPasswordConfirm}
          />

          <Button 
            title='Criar e acessar'
            onPress={handleSignUp}
          />
        </Center>

          <Button 
            title='Voltar para o login'
            variant='outline'
            mt={24}
            onPress={handleGoBack}
          />
      </VStack>
    </ScrollView>
  )
}