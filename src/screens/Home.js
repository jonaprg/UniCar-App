import React, { useState, useEffect } from 'react'
import {
  View, Text, TouchableOpacity,
  Image, TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard, Platform, StatusBar
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import GooglePlacesInput from '../components/GooglePlacesInput.js'
import DatePickerModal from '../components/DatePicker.js'
import SeatsInput from '../components/SeatsInput.js'
import { Toast } from 'react-native-toast-message/lib/src/Toast.js'
import { BASE_URL } from '../utils/base_url.js'

const Home = () => {
  const navigation = useNavigation()
  const initialSearchData = {
    origin: '',
    destination: '',
    dateTime: '',
    seats: 1

  }
  const [searchData, setsearchData] = useState(initialSearchData)
  const handleSearchPlaceOrigin = (data) => {
    setsearchData((prevState) => ({
      ...prevState,
      origin: data
    }))
  }

  const handleSearchPlaceDestination = (data) => {
    setsearchData((prevState) => ({
      ...prevState,
      destination: data
    }))
  }

  const handleSearchSeats = (data) => {
    setsearchData((prevState) => ({
      ...prevState,
      seats: data
    }))
  }

  const handleSearchDateTime = (data) => {
    setsearchData((prevState) => ({
      ...prevState,
      dateTime: data
    }))
  }

  const handleSearchTrip = async () => {
    const token = await AsyncStorage.getItem('@token')
    await fetch(`${BASE_URL}/api/v1/trips/search`, {
      method: 'POST',
      body: JSON.stringify({
        origin: searchData.origin,
        destination: searchData.destination,
        dateTime: searchData.dateTime,
        seats: searchData.seats

      }),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token.replace(/"/g, '')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        navigation.navigate('TripsSearch', { trips: data, seats: searchData.seats })
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'No hay viajes disponibles o falta completar algún campo.'
        })
        navigation.navigate('Home')
        console.log('ERROR - Get Trips search', error)
      })
  }

  useEffect(() => {
    // Cambiar estilo de StatusBar al montar la pantalla
    StatusBar.setBarStyle('light-content')
    StatusBar.setBackgroundColor('transparent')

    // Restaurar estilo de StatusBar al desmontar la pantalla
    return () => {
      StatusBar.setBarStyle('default')
      StatusBar.setBackgroundColor('transparent')
    }
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 bg-primary'
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
        <View className=' bg-primary'>
          <Image
            source={require('../../assets/headerHome.jpg')}
            style={{ width: '100%', height: 150 }}
          />
          <View className='m-5'>
            <Text className='text-2xl font-bold text-secondary'>
              ¿Dónde quieres ir?
            </Text>
            <View className='w-full bg-secondary rounded-3xl p-5 my-5'>
              <View className='mt-5'>
                <Text className='text-lg font-medium text-blueColor'>
                  Origen
                </Text>

                <GooglePlacesInput placeholder='De' onPlaceSelected={handleSearchPlaceOrigin} />
                <Text className='text-lg font-medium text-blueColor'>
                  Destino
                </Text>
                <GooglePlacesInput placeholder='A' onPlaceSelected={handleSearchPlaceDestination} />
                <DatePickerModal dateTimeSelected={(date) => handleSearchDateTime(date)} modeTime='date' titleButton='Escoge el día' />

                <View className='flex-row justify-between items-center my-3'>
                  <SeatsInput seatsSelected={handleSearchSeats} />
                  <TouchableOpacity
                    className='flex-row justify-center rounded-full bg-primary p-4 w-2/4 self-center'
                    onPress={handleSearchTrip}
                  >
                    <Text
                      className='text-white text-lg dark:text-black font-bold'
                    >
                      Buscar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  )
}

export default Home
