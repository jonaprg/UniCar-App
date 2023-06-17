import React from 'react'
import { View, Text } from 'react-native'
import FormButton from '../components/FormButton.js'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebaseConfig.js'
import Toast from 'react-native-toast-message'

const TripReservation = ({ route }) => {
  const { trip, seats } = route.params
  const navigation = useNavigation()

  const handleReservation = async () => {
    const token = await auth.currentUser.getIdToken()
    await fetch(`http://192.168.1.41:3000/api/v1/trips/${trip.tripId}/request/${seats}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 400) {
          Toast.show({
            type: 'error',
            text1: 'No se pudo reservar el viaje.',
            text2: 'Por favor, intente nuevamente.'
          })
        }
        if (data.status === 200) {
          Toast.show({
            type: 'success',
            text1: 'Se ha enviado la solicitud de reserva.'
          })
          setTimeout(() => {
          }, 3000)
          navigation.navigate('RequestTrip')
        }
        if (data.status === 403) {
          Toast.show({
            type: 'error',
            text1: 'No se pudo reservar el viaje.',
            text2: 'Por favor, intente nuevamente.'
          })
        }
        if (data.status === 404) {
          Toast.show({
            type: 'error',
            text1: 'No se pudo reservar el viaje.',
            text2: 'Ya no hay asientos disponibles o ya has reservado este viaje.'
          })
        }
      })
      .catch(error => console.log('ERROR - Not authorized', error))
  }

  return (
    <View className='flex-1'>

      <View className='p-4 bg-primary'>
        <View className='flex-row justify-between mb-5  '>
          <View className='flex-col '>
            <Text className='text-lg text-secondary first-letter:font-base '>Conductor</Text>
            <Text className='text-xl text-secondary font-bold '>{trip.userDriverName}</Text>
            <Text className='text-lg text-secondary font-base mt-5'>Coche / Color</Text>
            <Text className='text-lg text-secondary font-bold mb-1'>{trip.carBrand ?? '-'} / {trip.carColor ?? '-'}</Text>
          </View>

        </View>
        <View className='flex-col mb-5 '>
          <Text className='text-xl text-secondary font-base mb-1'>Salida</Text>
          <Text className='text-2xl text-secondary font-bold'>{trip.dateTime}</Text>
        </View>
      </View>
      <View className=' flex-col p-4 '>
        <Text className='text-lg text-blueColor font-bold mb-2'>Importe total: {seats} pasajeros</Text>

        <Text className='text-4xl text-blueColor font-bold'>{trip.price * seats}€ </Text>
        <Text className='text-xl text-blueColor font-bold'>{trip.price + '€'} / 1 pasajero</Text>

      </View>
      <View>
        <FormButton
          className='self-center mt-24 '
          buttonTitle='RESERVAR'
          onPress={handleReservation}
        />
      </View>
    </View>
  )
}

export default TripReservation
