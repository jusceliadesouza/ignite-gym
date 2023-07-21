import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { VStack, Image, Text, Center, Heading, ScrollView, useToast  } from 'native-base'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { useAuth } from '@hooks/useAuth'

import LogoSvg from '@assets/logo.svg'
import BackgroundImage from '@assets/background.png'

import { Button } from '@components/Button'
import { Input } from '@components/Input'

import { AppError } from '@utils/AppErrors'

type FormData = {
  email: string
  password: string
}

const signInSchema = yup.object({
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter, pelo menos, 6 caracteres.'),
})

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const { signIn } = useAuth()
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const toast = useToast()

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(signInSchema)
  })


  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true)
      await signIn(email, password) 
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível acessar a conta! Tente novamente mais tarde!'

      setIsLoading(false)

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
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
          <Heading 
            mb={6} 
            color="gray.100" 
            fontSize="xl" 
            fontFamily='heading'
          >
            Acesse sua conta
          </Heading>

          <Controller 
            control={control}
            name='email'
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder='E-mail'
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
            />
            )}
          />
          
          <Controller 
            control={control}
            name='password'
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder='Senha'
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
                value={value}
              />
            )}
          />

          <Button 
            title='Acessar'
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />
        </Center>

        <Center mt={24}>
          <Text 
            mb={3} 
            color="gray.100" 
            fontSize="sm" 
            fontFamily="body"
          >
            Ainda não tem uma acesso?
          </Text>

          <Button 
            title='Criar conta'
            variant='outline'
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}