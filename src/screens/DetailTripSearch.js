import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import moment from 'moment'
import FormButton from '../components/FormButton.js'
import {
  getUserProfile
} from '../utils/userOperations.js'
import { useNavigation } from '@react-navigation/native'
import localization from 'moment/locale/es'
import { auth } from '../firebaseConfig.js'

const DetailTripSearch = ({ route }) => {
  const { trip, isDriver, seats } = route.params
  console.log(route.params)
  const navigation = useNavigation()
  const tripDate = moment(trip.dateTime).locale('es').format('LL')
  const tripTime = moment(trip.dateTime).locale('es').format('LT')

  const tripDateTime = moment(trip.dateTime).locale('es', localization)
  const now = moment()
  const isExpired = now.isAfter(tripDateTime.add(2, 'hours'))

  const handleProfileUser = async (id) => {
    const dataUser = await getUserProfile(id)
    navigation.navigate('ProfileUserSearch', { dataUser, id })
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
          {isExpired
            ? (
              <View className='justify-center items-center mb-5'>
                <Text className='text-xl font-bold'>Ha finalizado el trayecto</Text>
              </View>
              )
            : (
              <View className='justify-center items-center mb-5'>
                <Text className='text-xl font-bold'>{tripDate}</Text>
                <Text className='text-lg font-bold'>Salida - {tripTime}</Text>
              </View>
              )}
        </View>
        <View className='flex-row justify-between items-center mb-5'>
          <View className='flex-column  items-center'>
            <Text className='text-lg font-normal'>Asientos</Text>
            <Text className='text-xl font-extrabold'>{trip.seatsAvailable + '/' + trip.seatPlaces}</Text>
          </View>
          <View className='flex-column items-center'>
            <Text className='text-lg font-normal'>Coche</Text>
            {trip.carBrand || trip.carColor
              ? (
                <View>
                  <Text className='text-xl font-bold'>{trip.carBrand}</Text>
                  <Text className='text-sm font-bold'>{trip.carColor}</Text>
                </View>
                )
              : (
                <Text className='text-xl font-bold'>No disponible</Text>
                )}
          </View>

          <View className='flex-column items-center'>
            <Text className='text-lg font-normal'>Importe</Text>
            <Text className='text-2xl font-bold'>{trip.price}€/pas.</Text>
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
        {trip.userDriver !== auth.currentUser.uid && (
          <View className='flex-column mb-2'>
            <Text className='text-lg font-normal'>Conductor</Text>
            {trip.userDriverName
              ? (
                <View className='flex-row  items-center mb-2 bg-secondary rounded-lg shadow shadow-gray-500 p-3 '>
                  <Text className='text-lg font-bold'>{trip.userDriverName}</Text>
                  <TouchableOpacity
                    className='bg-buttonColor px-3 py-2 rounded ml-auto'
                    onPress={() => handleProfileUser(trip.userDriver)}
                  >
                    <Text className='text-white font-bold'>Ver Perfil</Text>
                  </TouchableOpacity>
                </View>
                )
              : (
                <Text className='text-base font-bold'>No tiene nombre</Text>
                )}

          </View>
        )}

        <View className='flex-column mb-2'>
          <Text className='text-lg font-normal'>Pasajeros</Text>
          {Object.entries(trip.passengersData).length !== 0
            ? (
              <FlatList
                data={Object.values(trip.passengersData)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View className='flex-row  items-center mb-2 bg-secondary rounded-lg shadow shadow-gray-500 p-3 '>
                    <Text className='text-lg font-bold'>{item.name}</Text>
                    <TouchableOpacity
                      className='bg-buttonColor px-3 py-2 rounded ml-auto'
                      onPress={() => handleProfileUser(item.id)}
                    >
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

        {!isDriver && !isExpired && (
          <FormButton
            className='self-center'
            buttonTitle='CONTINUAR'
            onPress={() => navigation.navigate('TripReservation', { trip, seats })}
          />
        )}
      </View>
    </View>
  )
}

export default DetailTripSearch
