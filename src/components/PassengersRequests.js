import React from 'react'
import {
  View,
  Text,
  Button,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Alert
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'

import { fetchRequestTrip } from '../reducers/actions/requestPassengersActions.js'

const PassengersRequests = () => {
  const dispatch = useDispatch()
  const { data, isLoading, error } = useSelector((state) => state.requestsPassengers)
  console.log('hola:', data)

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchRequestTrip())
    }, [dispatch])
  )

  const handleRefresh = () => {
    dispatch(fetchRequestTrip())
  }

  const handleDeniedPassenger = async (item) => {

  }

  const handleAcceptPassenger = (item) => {
  }

  const renderTrip = ({ item }) => {
    return (

      <View className=' m-2 rounded-lg bg-white shadow shadow-gray-900  p-4'>
        <Text>Hola</Text>
        <View className='mt-5'>
          <View className='flex flex-row justify-between items-center'>
            <Text className='text-base font-bold text-gray-900'>Precio: {item.price}€</Text>
            <TouchableOpacity
              className='w-1/3 bg-blueColor py-2 px-2 rounded-full'
              onPress={() => handleDeniedPassenger(item)}
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
                  { text: 'Eliminar', onPress: () => handleAcceptPassenger(item) }
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
    <View>
      {
        error
          ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Se ha producido un error{error}</Text>
              <Button title='Intenta otra vez' onPress={handleRefresh} />
            </View>
            )
          : data.length !== 0
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
