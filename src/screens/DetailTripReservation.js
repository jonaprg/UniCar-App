import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const DetailTripReservation = ({ route }) => {
  const { trip } = route.params
  return (
    <View className='bg-white rounded-lg shadow p-4'>

      {/* Contenido de la tarjeta */}
      <View className='p-4 '>
        {/* Origen y destino */}
        <View className='flex-row items-center mb-2'>
          <Text className='font-semibold'>Origen:</Text>
          <Text className='ml-2'>{trip.origin}</Text>
        </View>
        <View className='flex-row items-center mb-2'>
          <Text className='font-semibold'>Destino:</Text>
          <Text className='ml-2'>jai</Text>
        </View>

        {/* Fecha y hora */}
        <Text className='text-sm text-gray-600 mb-2'>Fecha y Hora: 2023-06-11 10:11</Text>

        {/* Coche y color */}
        <Text className='text-sm text-gray-600 mb-2'>Coche: Toyota</Text>
        <Text className='text-sm text-gray-600 mb-2'>Color: Rojo</Text>

        {/* Total y disponibles de asientos */}
        <View className='flex-row items-center mb-2'>
          <Text className='font-semibold'>Total de Asientos:</Text>
          <Text className='ml-2'>2</Text>
        </View>
        <View className='flex-row items-center mb-2'>
          <Text className='font-semibold'>Asientos Disponibles:</Text>
          <Text className='ml-2'>2</Text>
        </View>

        {/* Precio y preferencias */}
        <View className='flex-row items-center mb-2'>
          <Text className='font-semibold'>Precio del Viaje:</Text>
          <Text className='ml-2'>9€</Text>
        </View>
        <View className='flex-row items-center mb-2'>
          <Text className='font-semibold'>Preferencias:</Text>
          <Text className='ml-2'>-</Text>
        </View>

        {/* Listado de pasajeros */}
        <View>
          <Text className='text-lg font-bold text-gray-800 mb-2'>Pasajeros:</Text>
          <View className='flex-row items-center'>
            <View className='w-12 h-12 bg-gray-300 rounded-full mr-2' />
            <Text className='text-sm font-semibold'>Nombre del Pasajero</Text>
            <TouchableOpacity className='bg-blue-500 px-3 py-1 rounded-full ml-auto'>
              <Text className='text-white font-bold'>Ver Perfil</Text>
            </TouchableOpacity>
          </View>
          {/* Repite este bloque para cada pasajero */}
        </View>
      </View>
    </View>
  )
}

export default DetailTripReservation
