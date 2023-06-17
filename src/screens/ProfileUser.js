import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
// import { getStorage, ref, getDownloadURL } from 'firebase/storage'
const UserProfile = ({ route }) => {
  const { data, id } = route.params
  const navigation = useNavigation()
  // const storage = getStorage()

  return (
    <View className='bg-white rounded-lg shadow flex-1  '>

      {/* Contenido de la tarjeta */}
      <View className='p-4'>
        <View className=' border-b-2 border-secondary'>
          <View className='flex-row items-center mb-2'>
            <View className='flex-row '>
              <Text className='text-2xl font-bold mr-1'>{data.name}</Text>
            </View>
          </View>
          {/* Fecha y hora */}
          <View className='my-2'>
            <Text className='text-xl font-bold'>Móvil</Text>
            <Text className='text-lg font-base'>{data.phone ?? 'No esta disponible'}</Text>
          </View>
        </View>
        <View className='flex-row justify-between items-center border-b-2 border-secondary'>

          <View className='flex-column my-5'>
            <Text className='text-lg font-bold'>Coche</Text>
            {data.carBrand
              ? (
                <View>
                  <Text className='text-lg font-base'>{data.carBrand}</Text>
                  <Text className='text-base font-base text-gray-500 '>{data.carColor}</Text>
                </View>
                )
              : (
                <Text className='text-lg font-base'>No disponible</Text>
                )}
          </View>

          <View className='flex-column'>
            <Text className='text-lg font-normal'>Valoraciones</Text>
            <Text className='text-lg font-bold'>No hay valoraciones</Text>
          </View>
          <View>
            <Text />
          </View>
        </View>
        <View className='flex-column my-5 border-b-2 border-secondary'>
          <Text className='text-lg font-normal'>Preferencias</Text>
          {data.preferences && data.preferences.length > 0
            ? (
              <FlatList
                data={data.preferences}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Text className='text-base font-bold my-2'>{item}</Text>
                )}
              />
              )
            : (
              <Text className='text-base font-bold'>No hay preferencias disponibles</Text>
              )}
        </View>
        <View className='flex-row justify-between items-center'>

          <Text className='text-lg font-normal'>Contacta vía mensaje</Text>
          <TouchableOpacity
            className='bg-blueColor px-3 py-2 rounded ml-auto'
            onPress={() => console.log('Enviar mensaje')}
          >
            <Text className='text-white font-bold'>Abrir chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default UserProfile
