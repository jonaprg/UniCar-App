import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import FormButton from '../components/FormButton.js'
import {
  getUserProfile
} from '../api/userOperations.js'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebaseConfig.js'
import Toast from 'react-native-toast-message'

const DetailTripSearch = ({ route }) => {
  const { trip, isDriver, seats } = route.params
  const navigation = useNavigation()
  const [date, time] = trip.dateTime.split(' ')
  const [day, month, year] = date.split('/')
  const [hour, minutes] = time.split(':')
  const fechaActual = new Date()
  const fechaExpiracion = new Date(year, month - 1, day, hour, minutes)
  fechaExpiracion.setHours(fechaExpiracion.getHours() + 2)

  const isExpired = fechaActual.toLocaleString() > fechaExpiracion.toLocaleString()

  const handleProfileUser = async (id) => {
    const reponse = await getUserProfile(id)
    if (reponse.status !== 200) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se ha podido cargar el perfil del usuario'
      })
    } else {
      navigation.navigate('ProfileUserSearch', { data: reponse.userData, id })
    }
  }

  return (
    <View className='bg-white rounded-lg shadow p-4 flex-1  '>

      {/* Contenido de la tarjeta */}
      <View className='p-4  '>
        {/* Origen y destino */}
        <View className='flex-row items-center mb-2 '>
          <View className='flex-row flex-wrap'>
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
                <Text className='text-xl font-bold'>{date}</Text>
                <Text className='text-lg font-bold'>Salida - {time}</Text>
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
                    className='bg-blueColor px-3 py-2 rounded ml-auto'
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
                      className='bg-blueColor px-3 py-2 rounded ml-auto'
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
