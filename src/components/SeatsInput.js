import React, { useState, useCallback } from 'react'
import { View, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const SeatsInput = ({ seatsSelected }) => {
  const [seats, setSeats] = useState(1)

  const handleDecreaseCount = useCallback(() => {
    if (seats > 1) {
      const newSeats = seats - 1
      setSeats(newSeats)
      if (seatsSelected) {
        seatsSelected(newSeats)
      }
    }
  }, [seats, seatsSelected])

  const handleIncreaseCount = useCallback(() => {
    if (seats < 4) {
      const newSeats = seats + 1
      setSeats(newSeats)
      if (seatsSelected) {
        seatsSelected(newSeats)
      }
    }
  }, [seats, seatsSelected])
  return (
    <View className='flex-column items-center'>
      <View className='flex-row  items-center mb-1'>
        <Text className=' text-lg font-medium text-blueColor'>Pasajeros </Text>
        <Text className='text-xs mt-1 text-gray-800'>(Máx 4)</Text>
      </View>
      <View className='flex-row justify-center items-center gap-3'>
        <AntDesign
          name='minuscircleo'
          size={24}
          color={seats === 1 ? 'gray' : 'black'}
          onPress={handleDecreaseCount}
        />
        <Text className='text-xl dark:text-white'>{seats}</Text>
        <AntDesign
          name='pluscircleo'
          size={24}
          color={seats === 4 ? 'gray' : 'black'}
          onPress={handleIncreaseCount}
        />
      </View>
    </View>
  )
}

export default SeatsInput
