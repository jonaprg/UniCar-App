import React from 'react'
import {
  View,
  Text,
  Button,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { auth } from '../firebaseConfig.js'

import { fetchTrips } from '../reducers/actions/tripActions.js'
import { deleteDriverTrip, deletePassengerTrip } from '../api/tripsOperations.js'

const TripScreen = () => {
  const dispatch = useDispatch()
  const { data, isLoading, error } = useSelector((state) => state.trips)
  const uid = auth.currentUser.uid
  const navigation = useNavigation()
  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchTrips())
    }, [dispatch])
  )
  const handleView = (item) => {
    const isDriver = item.userDriver === uid.toString()
    const isPassenger = !isDriver

    navigation.navigate('DetailTrip', { trip: item, isDriver, isPassenger })
  }

  const handleRefresh = () => {
    dispatch(fetchTrips())
  }

  const handleDeleteTrip = async (item) => {
    const isDriver = item?.userDriver === uid.toString()

    try {
      if (isDriver) {
        await deleteDriverTrip(item.tripId)
      } else {
        await deletePassengerTrip(item.tripId)
      }
      dispatch(fetchTrips())
    } catch (error) {
      console.error('ERROR - Not deleted trip:', error)
    }
  }

  const renderTrip = ({ item }) => {
    const [date, hours] = item?.dateTime.split(' ')
    const [day, month, year] = date.split('/')
    const [hour, minutes] = hours.split(':')
    const fechaActual = new Date()
    const fechaExpiracion = new Date(year, month - 1, day, hour, minutes)
    fechaExpiracion.setHours(fechaExpiracion.getHours() + 2)

    const isExpired = fechaActual > fechaExpiracion || (fechaActual.getTime() - fechaExpiracion.getTime()) >= 2 * 60 * 60 * 1000

    return (

      <View className=' m-2 rounded-lg bg-white shadow shadow-gray-900  p-4'>
        <View className='flex-row justify-between'>
          <View className='flex-column align-middle text-center'>
            <Text className='text-base font-bold text-gray-900'>{item?.origin} - {item?.destination}</Text>
            <Text className='text-base font-bold text-gray-900'>{isExpired ? 'Ha finalizado' : item?.dateTime + 'h'}</Text>

          </View>
        </View>
        <Text class='text-sm font-medium text-gray-600'>Plazas disponibles: {item?.seatsAvailable === 0 ? 'No hay plazas' : item.seatsAvailable}</Text>
        <Text>{item?.userDriver === uid.toString() ? 'Conductor' : 'Pasajero'}</Text>

        <View className='mt-5'>
          <View className='flex flex-row justify-between items-center'>
            <Text className='text-base font-bold text-gray-900'>Precio: {item?.price}€</Text>
            <TouchableOpacity
              className='w-1/3 bg-blueColor py-2 px-2 rounded-full'
              onPress={() => handleView(item)}
            >
              <Text className='text-white font-bold text-center'>
                Ver
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='w-1/3 bg-errorColor py-2 px-2 rounded-full'
              onPress={() =>

                Alert.alert('Quieres eliminar el viaje?', 'Se eliminará el viaje', [
                  {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                  },
                  { text: 'Eliminar', onPress: () => handleDeleteTrip(item) }
                ])}
            >
              <Text
                className='text-white font-bold text-center'

              >
                Eliminar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    )
  }
  return (
    <View style={{ flex: 1 }}>
      {isLoading
        ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' color='#0000ff' />
          </View>
          )
        : error
          ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Se ha producido un error{error}</Text>
              <Button title='Intenta otra vez' onPress={handleRefresh} />
            </View>
            )
          : data.length !== 0
            ? (
              <FlatList
                className='bg-secondary flex-1 w-full'
                data={data}
                renderItem={renderTrip}
                keyExtractor={(item) => item.tripId.toString()}
                refreshControl={
                  <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
          }
              />
              )
            : (
              <View className='flex-1 justify-center bg-secondary'>
                <Text className='text-3xl font-bold text-center text-blueColor '>No hay viajes disponibles</Text>
              </View>
              )}
    </View>
  )
}

export default TripScreen
