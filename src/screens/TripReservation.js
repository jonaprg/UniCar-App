import React from 'react'
import { View, Text } from 'react-native'
import FormButton from '../components/FormButton.js'
import { useNavigation } from '@react-navigation/native'

const TripReservation = ({ }) => {
  // console.log(route.params)
  // const { trip, seats } = route.params
  return (
    <View className='flex-1'>
      <View className='bg-primary flex-col p-4'>
        <Text className='text-lg text-secondary font-bold mb-2'>Importe total</Text>
        <Text className='text-4xl text-secondary font-bold'>2€ / 1 persona</Text>
      </View>
      <View className='p-4'>
        <View className='flex-row justify-between mb-5 '>
          <View className='flex-col '>
            <Text className='text-lg font-base '>Conductor</Text>
            <Text className='text-2xl font-bold mr-1'>Nombre</Text>
          </View>
          <View className='flex-col '>
            <Text className='text-lg font-base '>Coche / Color</Text>
            <Text className='text-lg font-bold mb-1'>Toyota / Blanco</Text>
          </View>
        </View>
        <View className='flex-col '>
          <Text className='text-xl font-base mb-1'>Salida</Text>
          <Text className='text-2xl font-bold mr-1'>23 DE jULIO, 11:10</Text>
        </View>
      </View>
      <View>
        <FormButton
          className='self-center '
          buttonTitle='RESERVAR'
          onPress={() => console.log('Actualizar')}
        />
      </View>
    </View>
  )
}

export default TripReservation
