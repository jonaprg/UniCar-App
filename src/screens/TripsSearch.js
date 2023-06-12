import {
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import localization from 'moment/locale/es'
import moment from 'moment'
import { auth } from '../firebaseConfig.js'

const TripsSearch = ({ route }) => {
  const { trips, seats } = route.params
  console.log(route.params)
  const uid = auth.currentUser.uid
  const navigation = useNavigation()

  const handleView = (item) => {
    const isDriver = item.userDriver === uid.toString()
    const isPassenger = !isDriver

    navigation.navigate('DetailTripSearch', { trip: item, isDriver, isPassenger, seats })
  }

  // Ordenar la lista por fecha
  const sortedData = trips.sort((a, b) => {
    const dateA = moment(a.dateTime)
    const dateB = moment(b.dateTime)
    return dateA - dateB
  })
  // Verificar si hay viajes no expirados
  const hasValidTrips = sortedData.some(item => {
    const now = moment()
    return !now.isAfter(moment(item.dateTime).locale('es', localization).add(2, 'hours'))
  })
  const renderTrip = ({ item }) => {
    const tripDateTime = moment(item.dateTime).locale('es', localization)
    const now = moment()
    const isExpired = now.isAfter(moment(item.dateTime).locale('es', localization).add(2, 'hours'))

    if (isExpired) {
      return null // No mostrar la tarjeta si ha expirado
    }

    return (

      <View className='m-2 rounded-lg  shadow shadow-gray-900  p-4 bg-white'>
        <View className='flex-row justify-between'>
          <View className='flex-column align-middle text-center'>
            <Text className='text-base font-bold text-gray-900'>{item.origin} - {item.destination}</Text>
            <Text className='text-base font-bold text-gray-900'>{isExpired ? 'Ha finalizado' : tripDateTime.format('DD MMM YY, H:mm')}</Text>

          </View>
        </View>
        {!isExpired && (
          <Text class='text-sm font-medium text-gray-600'>Plazas disponibles: {item.seatsAvailable === 0 ? 'No hay plazas' : item.seatsAvailable}</Text>
        )}
        <Text>{item.userDriver === uid.toString() && 'Eres el conductor'}</Text>

        <View className='mt-5'>
          {!isExpired && (
            <View className='flex flex-row justify-between items-center'>

              <Text className='text-base font-bold text-gray-900'>Precio: {item.price}€/pasajero</Text>
              <TouchableOpacity
                className='w-1/3 bg-buttonColor py-2 px-2 rounded-full'
                onPress={() => handleView(item)}
              >
                <Text className='text-white font-bold text-center'>
                  Ver
                </Text>
              </TouchableOpacity>

            </View>
          )}
        </View>
      </View>

    )
  }

  return (
    <View style={{ flex: 1 }}>

      {sortedData.length !== 0 && hasValidTrips

        ? (
          <FlatList
            className='bg-secondary flex-1 w-full'
            data={sortedData}
            renderItem={renderTrip}
            keyExtractor={(item) => item.tripId.toString()}

          />
          )
        : (
          <View className='flex-1 justify-center bg-secondary'>
            <Text className='text-3xl font-bold text-center text-buttonColor '>No hay viajes disponibles</Text>
          </View>
          )}
    </View>
  )
}

export default TripsSearch
