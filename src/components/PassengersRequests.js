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
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getUserProfile } from '../api/userOperations.js'
import Toast from 'react-native-toast-message'
import { fetchRequestTrip } from '../reducers/actions/requestPassengersActions.js'
import { acceptPassenger, rejectPassenger } from '../api/tripsOperations.js'

const PassengersRequests = ({ tripId }) => {
  const dispatch = useDispatch()
  const { data, isLoading } = useSelector((state) => state.requestsPassengers)
  console.log('dataPassengers', data)
  const navigation = useNavigation()
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
      const response = await rejectPassenger(tripId, passengerId)
      if (response) {
        dispatch(fetchRequestTrip(tripId))
      }
    } catch (error) {
      console.error('ERROR - Not authorized:', error)
    }
  }

  const handleAcceptPassenger = async (tripId, passengerId) => {
    try {
      const response = await acceptPassenger(tripId, passengerId)
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

  const handleProfileUser = async (id) => {
    const reponse = await getUserProfile(id)
    if (reponse.status !== 200) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se ha podido cargar el perfil del usuario'
      })
    } else {
      navigation.navigate('ProfileUser', { data: reponse.userData, id })
    }
  }

  const renderTrip = ({ item }) => {
    const iniciales = obtenerIniciales(item?.passengerName || '')
    return (
      <View>
        <Text className='text-lg font-base'>Peticiones de pasajeros</Text>

        <View className=' py-3 flex-row items-center justify-between mb-10'>
          <TouchableOpacity onPress={() => handleProfileUser(item.passengerId)}>
            <View className='flex-col'>
              <View className='flex-row items-center justify-between'>
                <Text className='text-lg font-bold text-blueColor'>{iniciales} </Text>
                <Text className=''>(Ver perfil)</Text>
              </View>
              <Text className='text-xs font-bold text-blueColor'>Petición de: {item?.seats} pasajero/s</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className='w-1/4 bg-primary py-2 px-2 rounded-full'
            onPress={() =>

              Alert.alert('¿Quieres aceptar al pasajero?', 'Se aceptará al pasajero al viaje', [
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

              Alert.alert('¿Quieres rechazar al pasajero?', 'Se rechazará al pasajero del viaje', [
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
              <Text className='text-lg font-base '>Peticiones de pasajeros</Text>
              <Text className='text-base font-bold '>No hay peticiones de pasajeros</Text>
            </View>
            )
}
    </View>
  )
}

export default PassengersRequests
