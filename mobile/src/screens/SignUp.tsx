import { useNavigation } from '@react-navigation/native'
import { VStack, Image, Text, Center, Heading, ScrollView  } from 'native-base'
import { useForm, Controller } from 'react-hook-form'

import LogoSvg from '@assets/logo.svg'
import BackgroundImage from '@assets/background.png'

import { Button } from '@components/Button'
import { Input } from '@components/Input'

type FormDataProps = {
  name: string
  email: string
  password: string
  password_confirm: string
}

export function SignUp() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    defaultValues: {
      password: 'ignite-gym',
      password_confirm: 'ignite-gym',
    }
  })

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  function handleSignUp({ name, email, password, password_confirm }: FormDataProps) {
    console.log({ name, email, password, password_confirm })
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

          <Controller 
            control={control}
            name='name'
            rules={{
              required: 'Informe o nome.'
            }}
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder='Nome'
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Text color="white">
              {errors.name?.message}
          </Text>

          <Controller 
            control={control}
            name='email'
            rules={{
              required: 'Informe o e-mail.'
            }}
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder='E-mail'
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={onChange}
                value={value}
            />
            )}
          />

          <Controller 
            control={control}
            name='password'
            rules={{
              required: 'Informe a senha.'
            }}
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder='Senha'
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller 
            control={control}
            name='password_confirm'
            rules={{
              required: 'Confirme a senha.'
            }}
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder='Confirme a senha'
                secureTextEntry
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType='send'
                value={value}
              />
            )}
          />

          <Button 
            title='Criar e acessar'
            onPress={handleSubmit(handleSignUp)}
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