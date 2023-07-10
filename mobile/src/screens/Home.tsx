import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { FlatList, HStack, Heading, Text, VStack, useToast } from 'native-base'

import { api } from '@services/api'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { ExerciseDTO } from '@dtos/ExerciseDTO'

import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { AppError } from '@utils/AppErrors'

export function Home(){
  const [groups, setGroups] = useState<string[]>([])
  const [groupSelected, setGroupSelected] = useState('costas')
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])

  const toast = useToast()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')
  }

  async function fetchGroups() {
    try {
      const response = await api.get('/groups')
      setGroups(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  async function fetchExercisesByGroup() {
    try {
      const response = await api.get(`/exercises/bygroup/${groupSelected}`)
      setExercises(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar os exercícios.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  useFocusEffect(useCallback(() => {
    fetchExercisesByGroup()
  }, [groupSelected]))

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group 
            name={item} 
            isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />
      
      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading 
            color="gray.200" 
            fontSize='md'
            fontFamily="heading"
          >
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>


        <FlatList 
          data={exercises}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ExerciseCard 
              onPress={handleOpenExerciseDetails}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  )
}