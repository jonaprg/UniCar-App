import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import moment from 'moment'
import FormButton from '../components/FormButton.js'
import {
  getUserProfile
} from '../utils/userOperations.js'
import { useNavigation } from '@react-navigation/native'

const DetailTrip = ({ route }) => {
  const { trip, isDriver } = route.params
  const navigation = useNavigation()
  console.log('TRIP', trip)
  const tripDate = moment(trip.dateTime).locale('es').format('LL')
  const tripTime = moment(trip.dateTime).locale('es').format('LT')
  const priceTotal = isDriver ? (trip.price * trip.passengers.length || 0) : trip.price
  const handleProfileUser = (id) => {
    const dataUser = getUserProfile(id)
    console.log('DATA USER', dataUser)
    navigation.navigate('ProfileUser', { dataUser })
  }
  return (
    <View className='bg-white rounded-lg shadow p-4 flex-1  '>

      {/* Contenido de la tarjeta */}
      <View className='p-4  '>
        {/* Origen y destino */}
        <View className='flex-row items-center mb-2'>
          <View className='flex-row '>
            <Text className='text-xl font-bold mr-1'>{trip.origin} -</Text>
            <Text className='text-xl font-bold'>{trip.destination}</Text>
          </View>
        </View>
        {/* Fecha y hora */}
        <View className='flex'>
          <View className='justify-center items-center mb-5'>
            <Text className='text-xl font-bold'>{tripDate}</Text>
            <Text className='text-lg font-bold'>Salida - {tripTime}</Text>
          </View>
        </View>
        <View className='flex-row justify-between items-center mb-5'>
          <View className='flex-column  items-center'>
            <Text className='text-lg font-normal'>Asientos</Text>
            <Text className='text-xl font-extrabold'>{trip.seatsAvailable + '/' + trip.seatPlaces}</Text>
          </View>
          <View className='flex-column items-center'>
            <Text className='text-lg font-normal'>Coche</Text>
            <Text className='text-xl font-bold'>{trip.carBrand && trip.carColor ? trip.carBrand + ' - ' + trip.carColor : 'No disponible'}</Text>
          </View>

          <View className='flex-column items-center'>
            <Text className='text-lg font-normal'>{isDriver ? 'Importe total' : 'Importe'}</Text>
            <Text className='text-2xl font-bold'>{priceTotal}€</Text>
          </View>
        </View>
        <View className='flex-column mb-2'>
          <Text className='text-lg font-normal'>Preferencias</Text>
          {trip.preferences && trip.preferences.length > 0
            ? (
              <FlatList
                data={trip.preferences}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Text className='text-base font-bold'>{item}</Text>
                )}
              />
              )
            : (
              <Text className='text-base font-bold'>No hay preferencias disponibles</Text>
              )}
        </View>
        <View className='flex-column mb-2'>
          <Text className='text-lg font-normal'>Conductor</Text>
          {trip.userDriverName
            ? (
              <View className='flex-row  items-center mb-2 bg-secondary rounded-lg shadow shadow-gray-500 p-3 '>
                <Text className='text-lg font-bold'>{trip.userDriverName}</Text>
                <TouchableOpacity className='bg-buttonColor px-3 py-2 rounded ml-auto'>
                  <Text className='text-white font-bold'>Ver Perfil</Text>
                </TouchableOpacity>
              </View>
              )
            : (
              <Text className='text-base font-bold'>No tiene nombre</Text>
              )}

        </View>
        <View className='flex-column mb-2'>
          <Text className='text-lg font-normal'>Pasajeros</Text>
          {trip.passengersData
            ? (
              <FlatList
                data={Object.values(trip.passengersData)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View className='flex-row  items-center mb-2 bg-secondary rounded-lg shadow shadow-gray-500 p-3 '>
                    <Text className='text-lg font-bold'>{item.name}</Text>
                    <TouchableOpacity className='bg-buttonColor px-3 py-2 rounded ml-auto'>
                      <Text className='text-white font-bold'>Ver Perfil</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
              )
            : (
              <Text className='text-base font-bold'>No hay pasajeros</Text>
              )}
        </View>

        {isDriver && (
          <FormButton
            className='self-center'
            buttonTitle='EDITAR'
            onPress={() => console.log('Actualizar')}
          />
        )}
      </View>
    </View>
  )
}

export default DetailTrip
