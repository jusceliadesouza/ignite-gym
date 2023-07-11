import { TouchableOpacity } from 'react-native'
import { Box, HStack, Heading, Icon, Image, ScrollView, Text, VStack, useToast } from 'native-base'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'

import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { ExerciseDTO } from '@dtos/ExerciseDTO'

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'

import { Button } from '@components/Button'
import { AppError } from '@utils/AppErrors'
import { api } from '@services/api'
import { useEffect, useState } from 'react'

type RoutesParamsProps = {
  exerciseId: string
}

export function Exercise() {
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const route = useRoute()
  const toast = useToast()

  const { exerciseId } = route.params as RoutesParamsProps

  function handleGoBack() {
    navigation.goBack()
  }


  async function fetchExercisesDetails() {
    try {
      const response = await api.get(`/exercises/${exerciseId}`)
      setExercise(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar os detalhes dos exercícios.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  useEffect(() => {
    fetchExercisesDetails()
  }, [exerciseId])

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon
            as={Feather}
            name="arrow-left"
            color="green.500"
            size={6}
          />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          mt={4}
          mb={8}
          alignItems="center"
        >
          <Heading
            color="gray.100"
            fontSize="lg"
            fontFamily="heading"
            flexShrink={1}
          >
            {exercise.name}
          </Heading>

          <HStack alignItems='center'>
            <BodySvg />
            <Text
              color="gray.200"
              ml={1}
              textTransform="capitalize"
            >
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <VStack p={8}>
        <Box rounded="lg" mb={3} overflow='hidden'>
          {exercise.demo && (
            <Image
              w="full"
              h={80}
              source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}` }}
              alt="Nome do exercício"
              resizeMode='cover'
              rounded="lg"
              overflow="hidden"
            />
          )}
        </Box>

        <Box
          bg="gray.600"
          rounded="md"
          pb={4}
          px={4}
        >
          <HStack
            mb={6}
            mt={5}
            alignItems="center"
            justifyContent="space-around"
          >
            <HStack>
              <SeriesSvg />

              <Text
                color="gray.200"
                ml={2}
              >
                {exercise.series} séries
              </Text>
            </HStack>

            <HStack>
              <RepetitionsSvg />

              <Text
                color="gray.200"
                ml={2}
              >
                {exercise.repetitions} repetições
              </Text>
            </HStack>
          </HStack>

          <Button
            title='Marcar como realizado'
          />
        </Box>
      </VStack>
    </VStack>
  )
}