import React, { useState, useCallback } from 'react'
import { View, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const PriceInput = ({ priceSelected }) => {
  const [price, setPrice] = useState(2)

  const handleDecreaseCount = useCallback(() => {
    if (price > 2) {
      const newSeats = price - 1
      setPrice(newSeats)
      if (priceSelected) {
        priceSelected(newSeats)
      }
    }
  }, [price, priceSelected])

  const handleIncreaseCount = useCallback(() => {
    if (price < 15) {
      const newSeats = price + 1
      setPrice(newSeats)
      if (priceSelected) {
        priceSelected(newSeats)
      }
    }
  }, [price, priceSelected])

  return (
    <View className='flex-column items-center'>
      <Text className=' text-lg font-medium text-blueColor'>Precio por asiento</Text>
      <View className='flex-row justify-center items-center gap-3'>
        <AntDesign
          name='minuscircleo'
          size={24}
          color={price === 2 ? 'gray' : 'black'}
          onPress={handleDecreaseCount}
        />
        <Text className='text-xl dark:text-white'>{price} €</Text>
        <AntDesign
          name='pluscircleo'
          size={24}
          color={price === 15 ? 'gray' : 'black'}
          onPress={handleIncreaseCount}
        />
      </View>
    </View>
  )
}

export default PriceInput
