import { HStack, VStack } from 'native-base'

import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { useState } from 'react'

export function Home(){
  const [groupSelected, setGroupSelected] = useState('costas')

  return (
    <VStack flex={1}>
      <HomeHeader />

      <HStack>
        <Group 
          name="costas" 
          isActive={groupSelected === 'costas'}
          onPress={() => setGroupSelected('costas')}
        />

        <Group 
          name="ombros" 
          isActive={groupSelected === 'ombros'}
          onPress={() => setGroupSelected('ombros')}

        />
      </HStack>
    </VStack>
  )
}