import React, { useState, useEffect } from 'react'
import {
  View, Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard, Platform
} from 'react-native'
import GooglePlacesInput from '../components/GooglePlacesInput.js'
import DatePickerModal from '../components/DatePicker.js'
import PriceInput from '../components/PriceInput.js'
import SeatsInput from '../components/SeatsInput.js'
import FormButton from '../components/FormButton.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Toast } from 'react-native-toast-message/lib/src/Toast.js'

const CreateTrip = () => {
  const navigation = useNavigation()

  const initialTripData = {
    origin: '',
    destination: '',
    dateTime: '',
    seats: 1,
    price: 2

  }
  const [tripData, setTripData] = useState(initialTripData)
  const handlePlaceOrigin = (data) => {
    setTripData((prevState) => ({
      ...prevState,
      origin: data
    }))
  }

  const handlePlaceDestination = (data) => {
    setTripData((prevState) => ({
      ...prevState,
      destination: data
    }))
  }

  const handleSeats = (data) => {
    setTripData((prevState) => ({
      ...prevState,
      seats: data
    }))
  }

  const handlePriceTrip = (data) => {
    setTripData((prevState) => ({
      ...prevState,
      price: data
    }))
  }

  const handleDateTime = (data) => {
    setTripData((prevState) => ({
      ...prevState,
      dateTime: data
    }))
  }

  useEffect(() => {
  }, [tripData])

  const createDocTrip = async () => {
    const areAllFieldsFilled = () => {
      for (const key in tripData) {
        if (tripData[key] === '') {
          return false // Si hay algún campo vacío, retorna false
        }
      }
      return true // Todos los campos están llenos, retorna true
    }

    if (!areAllFieldsFilled()) {
      Toast.show({
        type: 'error',
        text1: 'No se pudo crear el viaje.',
        text2: 'Por favor, complete todos los campos'
      })
      return // Si algún campo está vacío, no se realiza la petición
    }
    const token = await AsyncStorage.getItem('@token')
    await fetch('http://192.168.1.41:3000/api/v1/trips/trip', {
      method: 'POST',
      body: JSON.stringify(tripData),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token.replace(/"/g, '')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 400) {
          Toast.show({
            type: 'error',
            text1: 'No se pudo crear el viaje.',
            text2: 'Por favor, intente nuevamente.'
          })
        }
        if (data.status === 201) {
          Toast.show({
            type: 'success',
            text1: 'Viaje creado con éxito.',
            text2: 'Se te redirigirá a la lista de viajes.'
          })
          setTimeout(() => {
          }, 3000)
          setTripData(initialTripData)
          navigation.navigate('TripsStack', { screen: 'ListTrips' })
        }
        if (data.status === 403) {
          Toast.show({
            type: 'error',
            text1: 'No se pudo crear el viaje.'
          })
        }
        if (data.status === 409) {
          Toast.show({
            type: 'error',
            text1: 'No se pudo crear el viaje.',
            text2: 'Ya has ingresado un viaje existente con estos mismos datos.'
          })
        }
      })
      .catch(error => console.log('ERROR - Not authorized', error))
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
        <View className='bg-secondary  flex-1'>
          <View className='p-5'>
            <Text className='text-2xl font-bold text-blueColor'>
              ¿Dónde quieres ir?
            </Text>
            <View className='w-full bg-white shadow shadow-gray-500 rounded-3xl p-5 my-5'>
              <View className='mt-5'>
                <Text className='text-lg font-medium text-blueColor'>
                  Origen
                </Text>

                <GooglePlacesInput placeholder='De' onPlaceSelected={handlePlaceOrigin} />
                <Text className='text-lg font-medium text-blueColor'>
                  Destino
                </Text>
                <GooglePlacesInput placeholder='A' onPlaceSelected={handlePlaceDestination} value={tripData.destination} />
                <DatePickerModal dateTimeSelected={(date) => handleDateTime(date)} modeTime='datetime' titleButton='Escoga el día y hora' />
                <PriceInput priceSelected={handlePriceTrip} />

                <View className='flex-row justify-between items-center my-5'>
                  <SeatsInput seatsSelected={handleSeats} />

                  <FormButton
                    className='flex-row justify-center bg-primary rounded-full p-3 w-2/4 self-center'
                    buttonTitle='Publicar viaje'
                    onPress={createDocTrip}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  )
}

export default CreateTrip
