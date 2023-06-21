import { Center, Text, VStack } from 'native-base'

import { ScreenHeader } from '@components/ScreenHeader'
import { HistoryCard } from '@components/HistoryCard'

export function Historic(){
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <HistoryCard />
    </VStack>
  )
}