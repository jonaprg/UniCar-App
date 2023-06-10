import React, { useState, useEffect } from 'react'
import {
  View, Text, TouchableOpacity,
  Image, TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard, Platform
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'

import GooglePlacesInput from '../components/GooglePlacesInput.js'
import DatePickerModal from '../components/DatePicker.js'
import SeatsInput from '../components/SeatsInput.js'

const Home = ({ navigation }) => {
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
  // useEffect(() => {
  //   const areAllFieldsFilled = () => {
  //     for (const key in searchData) {
  //       if (searchData[key] === '') {
  //         return false
  //       }
  //     }
  //     return true
  //   }

  //   if (!areAllFieldsFilled()) {
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Por favor, complete todos los campos antes de buscar el viaje.'
  //     })
  //   } else {
  //     handleSearchTrip()
  //   }
  // }, [searchData])

  const handleSearchTrip = async () => {
    const token = await AsyncStorage.getItem('@token')
    await fetch('http://192.168.1.41:3000/api/v1/trips/search', {
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
        console.log('trips', data)
      })
      .catch(error => console.log('ERRO GET TRIPS', error))
  }
  console.log('trip', searchData)

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
        <View className='bg-primary flex-1'>
          <Image
            source={require('../../assets/headerHome.jpg')}
            className='w-full h-52'
          />
          <View className='p-5'>
            <Text className='text-2xl font-bold text-secondary'>
              ¿Donde quieres ir?
            </Text>
            <View className='w-full bg-secondary rounded-3xl p-5 my-5'>
              <View className='mt-5'>
                <Text className='text-lg font-medium text-buttonColor'>
                  Origen
                </Text>

                <GooglePlacesInput placeholder='De' onPlaceSelected={handleSearchPlaceOrigin} />
                <Text className='text-lg font-medium text-buttonColor'>
                  Destino
                </Text>
                <GooglePlacesInput placeholder='A' onPlaceSelected={handleSearchPlaceDestination} />
                <DatePickerModal dateTimeSelected={(date) => handleSearchDateTime(date)} modeTime='date' titleButton='Escoge el dia' />

                <View className='flex-row justify-between items-center my-3'>
                  <SeatsInput seatsSelected={handleSearchSeats} />
                  <TouchableOpacity className='flex-row justify-center rounded-full bg-primary p-4 w-2/4 self-center'>
                    <Text
                      className='text-white dark:text-black font-bold'
                      onPress={handleSearchTrip}
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
