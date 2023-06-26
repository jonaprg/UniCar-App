import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const RequestTrip = () => {
  const navigation = useNavigation()

  return (
    <View className='flex-1 items-center justify-center bg-primary'>
      <FontAwesome5 name='user-clock' size={90} color='white' />
      <Text className='text-4xl font-bold mt-10 text-white'>Esperando...</Text>
      <Text className='text-xl w-10/12 text-white mt-2'>
        El conductor debe aceptar tu solicitud, espera o vuelve al inicio
      </Text>

      <TouchableOpacity
        className='bg-blueColor py-5 px-5 rounded-lg shadow-lg shadow-black mt-10'
        onPress={() => navigation.navigate('Home')}
      >
        <Text className='text-white font-bold text-lg'>Volver al Inicio</Text>
      </TouchableOpacity>
    </View>
  )
}

export default RequestTrip
