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

const CreateTrip = () => {
  const navigation = useNavigation()
  const [errorMessage, setErrorMessage] = useState('')

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
    console.log('tripData:', tripData)
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
      setErrorMessage('Por favor, complete todos los campos antes de publicar el viaje.')
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
          setErrorMessage('No se pudo crear el viaje. Por favor, intente nuevamente.')
          setTimeout(() => {
            setErrorMessage('')
          }, 5000)
        }
        if (data.status === 201) {
          setErrorMessage('Viaje creado con éxito.')
          setTimeout(() => {
            setErrorMessage('')
          }, 5000)
          setTripData(initialTripData)
          navigation.navigate('TripsStack', { screen: 'ListTrips' })
        }
        if (data.status === 403) {
          setErrorMessage('No tiene permisos para crear un viaje.')
          setTimeout(() => {
            setErrorMessage('')
          }, 5000)
        }
        if (data.status === 409) {
          setErrorMessage('Ya has ingresado un viaje existente con estos mismos datos.')
          setTimeout(() => {
            setErrorMessage('')
          }, 5000)
        }
      })
      .catch(error => console.log('ERROR CREATE DOC TRIP', error))
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
        <View className='bg-secondary  flex-1'>
          <View className='p-5'>
            <Text className='text-2xl font-bold text-buttonColor'>
              ¿Donde quieres ir?
            </Text>
            <View className='w-full bg-white shadow shadow-gray-500 rounded-3xl p-5 my-5'>
              <View className='mt-5'>
                <Text className='text-lg font-medium text-buttonColor'>
                  Origen
                </Text>

                <GooglePlacesInput placeholder='De' onPlaceSelected={handlePlaceOrigin} />
                <Text className='text-lg font-medium text-buttonColor'>
                  Destino
                </Text>
                <GooglePlacesInput placeholder='A' onPlaceSelected={handlePlaceDestination} value={tripData.destination} />
                <DatePickerModal dateTimeSelected={(date) => handleDateTime(date)} modeTime='datetime' titleButton='Escoga el dia y hora' />
                <PriceInput priceSelected={handlePriceTrip} />

                <View className='flex-row justify-between items-center my-5'>
                  <SeatsInput seatsSelected={handleSeats} />

                  <FormButton
                    className='flex-row justify-center rounded-full p-3 w-2/4 self-center'
                    buttonTitle='Publicar viaje'
                    onPress={createDocTrip}
                  />
                </View>
                {errorMessage !== '' && <Text className='text-errorColor'>{errorMessage}</Text>}
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  )
}

export default CreateTrip
