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
import localization from 'moment/locale/es'
import moment from 'moment'
import { auth } from '../firebaseConfig.js'
import Toast from 'react-native-toast-message'

import { fetchTrip } from '../reducers/actions/tripActions.js'
import { deleteDriverTrip, deletePassengerTrip } from '../utils/tripsOperations.js'

const TripScreen = () => {
  const dispatch = useDispatch()
  const { data, isLoading, error } = useSelector((state) => state.trips)
  const uid = auth.currentUser.uid
  const navigation = useNavigation()

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchTrip())
    }, [dispatch])
  )
  const handleView = (item) => {
    const isDriver = item.userDriver === uid.toString()
    const isPassenger = !isDriver

    navigation.navigate('DetailTrip', { trip: item, isDriver, isPassenger })
  }

  const handleRefresh = () => {
    dispatch(fetchTrip())
  }
  // Ordenar la lista por fecha
  const sortedData = data.sort((a, b) => {
    const dateA = moment(a.dateTime)
    const dateB = moment(b.dateTime)
    return dateA - dateB
  })

  const handleDeleteTrip = async (item) => {
    const isDriver = item.userDriver === uid.toString()
    // Realizar la petición a la API para eliminar el viaje

    try {
      if (isDriver) {
        const response = await deleteDriverTrip(item.tripId)
        console.log('response', response)
        if (!response) {
          Toast.show({
            type: 'error',
            text1: 'No se ha podido eliminar el viaje'
          })
        } else {
          Toast.show({
            type: 'success',
            text1: 'Viaje eliminado'
          })
        }
      } else {
        const response = await deletePassengerTrip(item.tripId)
        console.log('response', response)
        if (!response) {
          Toast.show({
            type: 'error',
            text1: 'No te has podido desapuntar del viaje'
          })
        } else {
          Toast.show({
            type: 'success',
            text1: 'Te has desapuntado del viaje'
          })
        };
      }

      // Actualizar la pantalla después de eliminar el viaje
      dispatch(fetchTrip())
    } catch (error) {
      // Manejar el error en caso de que ocurra
      console.error('Error al eliminar el viaje:', error)
    }
  }

  const renderTrip = ({ item }) => {
    const tripDateTime = moment(item.dateTime).locale('es', localization)

    const now = moment()
    const isExpired = now.isAfter(moment(item.dateTime).locale('es', localization).add(2, 'hours'))

    return (

      <View className=' m-2 rounded-lg bg-white shadow shadow-gray-900  p-4'>
        <View className='flex-row justify-between'>
          <View className='flex-column align-middle text-center'>
            <Text className='text-base font-bold text-gray-900'>{item.origin} - {item.destination}</Text>
            <Text className='text-base font-bold text-gray-900'>{isExpired ? 'Ha finalizado' : tripDateTime.format('DD MMM YY, H:mm')}</Text>

          </View>
          <Text>{item.userDriver === uid.toString() ? 'Conductor' : 'Pasajero'}</Text>
        </View>
        <Text class='text-sm font-medium text-gray-600'>Plazas disponibles: {item.seatsAvailable === 0 ? 'No hay plazas' : item.seatsAvailable}</Text>

        <View className='mt-5'>
          <View className='flex flex-row justify-between items-center'>
            <Text className='text-base font-bold text-gray-900'>Precio: {item.price}€</Text>
            <TouchableOpacity
              className='w-1/3 bg-buttonColor py-2 px-2 rounded-full'
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
                data={sortedData}
                renderItem={renderTrip}
                keyExtractor={(item) => item.tripId.toString()}
                refreshControl={
                  <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
          }
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

export default TripScreen
