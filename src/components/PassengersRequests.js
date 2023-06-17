import React from 'react'
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Alert
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'

import { fetchRequestTrip } from '../reducers/actions/requestPassengersActions.js'
import { acceptPassenger, rejectPassenger } from '../api/tripsOperations.js'
const PassengersRequests = ({ tripId }) => {
  const dispatch = useDispatch()
  const { data, isLoading } = useSelector((state) => state.requestsPassengers)

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchRequestTrip(tripId))
    }, [dispatch])
  )

  const handleRefresh = () => {
    dispatch(fetchRequestTrip(tripId))
  }

  const handleRejectPassenger = async (tripId, passengerId) => {
    try {
      console.log('tripId', tripId, 'passengerId', passengerId)

      const response = await rejectPassenger(tripId, passengerId)
      console.log('response', response)
      if (response) {
        dispatch(fetchRequestTrip(tripId))
      }
    } catch (error) {
      console.error('ERROR - Not authorized:', error)
    }
  }

  const handleAcceptPassenger = async (tripId, passengerId) => {
    try {
      console.log('tripId', tripId, 'passengerId', passengerId)
      const response = await acceptPassenger(tripId, passengerId)
      console.log('response', response)
      if (response) {
        dispatch(fetchRequestTrip(tripId))
      }
    } catch (error) {
      console.error('ERROR - Not authorized:', error)
    }
  }

  const obtenerIniciales = (nombreCompleto) => {
    const palabras = nombreCompleto.split(' ')
    let iniciales = palabras[0]

    if (palabras.length > 1) {
      for (let i = 1; i < palabras.length; i++) {
        iniciales += ' ' + palabras[i].charAt(0).toUpperCase() + '.'
      }
    }

    return iniciales
  }

  const renderTrip = ({ item }) => {
    const iniciales = obtenerIniciales(item?.passengerName || '')
    return (
      <View>
        <Text className='text-lg font-base text-blueColor '>Peticiones de pasajeros</Text>

        <View className=' py-3 flex-row items-center justify-between mb-10'>
          <View className='flex-col'>
            <Text className='text-lg font-bold text-gray-900'>{iniciales}</Text>
            <Text className='text-sm font-bold text-gray-900'>Petición: {item?.seats} pasajeros</Text>
          </View>
          <TouchableOpacity
            className='w-1/4 bg-primary py-2 px-2 rounded-full'
            onPress={() =>

              Alert.alert('Quieres aceptar este pasajero?', 'Se aceptará al pasajero al viaje', [
                {
                  text: 'Cancelar',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel'
                },
                { text: 'Aceptar', onPress: () => handleAcceptPassenger(item.tripId, item.passengerId) }
              ])}
          >
            <Text className='text-white font-bold text-center'>
              Aceptar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className='w-1/4 bg-errorColor py-2 px-2 rounded-full'
            onPress={() =>

              Alert.alert('Quieres rechazar al pasajero?', 'Se rechazará al pasajero del viaje', [
                {
                  text: 'Cancelar',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel'
                },
                { text: 'Sí', onPress: () => handleRejectPassenger(item.tripId, item.passengerId) }
              ])}
          >
            <Text
              className='text-white font-bold text-center'
            >
              Rechazar
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    )
  }

  return (
    <View>
      {
        data.length !== 0
          ? (
            <FlatList
              className=' w-full'
              data={data}
              renderItem={renderTrip}
              keyExtractor={(item) => item.tripId.toString()}
              refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
          }
            />
            )
          : (
            <View>
              <Text className='text-lg font-base text-blueColor '>Peticiones de pasajeros</Text>
              <Text className='text-lg font-bold text-blueColor '>No hay peticiones de pasajeros</Text>
            </View>
            )
}
    </View>
  )
}

export default PassengersRequests
