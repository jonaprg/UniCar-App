import React from 'react'
import { View, Text, Button, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import localization from 'moment/locale/es'
import moment from 'moment'

import { fetchTrip } from '../reducers/actions/tripActions.js'

const TripScreen = () => {
  const dispatch = useDispatch()
  const { data, isLoading, error } = useSelector((state) => state.trips)

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchTrip())
    }, [dispatch])
  )

  const handleRefresh = () => {
    dispatch(fetchTrip())
  }

  const renderTrip = ({ item }) => (
    <View className=' m-2 rounded-lg bg-white shadow shadow-gray-900  p-4'>
      <View className='flex-column'>
        <Text className='text-base font-bold text-gray-900'>{item.origin} - {item.destination}</Text>
        <Text className='text-base font-bold text-gray-900'>{moment(item.dateTime).locale('es', localization).format('DD MMM YY, H:mm')}</Text>

      </View>
      <Text class='text-sm font-medium text-gray-600'>Plazas disponibles: {item.seatsAvailable === 0 ? 'No hay plazas' : item.seatsAvailable}</Text>

      <View className='mt-5'>
        <View className='flex flex-row justify-between items-center'>
          <Text className='text-base font-bold text-gray-900'>Precio: {item.price}€</Text>
          <TouchableOpacity className='w-1/3 bg-buttonColor py-2 px-2 rounded-full'>
            <Text className='text-white font-bold text-center'>
              Ver
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className='w-1/3 bg-errorColor py-2 px-2 rounded-full'>
            <Text className='text-white font-bold text-center'>
              Eliminar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  )

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
              <Button title='Retry' onPress={handleRefresh} />
            </View>
            )
          : (
            <FlatList
              className='bg-secondary flex-1 w-full'
              data={data}
              renderItem={renderTrip}
              keyExtractor={(item) => item.tripId.toString()}
              refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
          }
            />
            )}
    </View>
  )
}

export default TripScreen
