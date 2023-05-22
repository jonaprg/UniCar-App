import React, { useState } from 'react'
import {
  View, Text, TouchableOpacity,
  Image, TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard, Platform
} from 'react-native'
import GooglePlacesInput from '../components/GooglePlacesInput.js'
import DatePickerModal from '../components/DatePicker.js'
import SeatsInput from '../components/SeatsInput.js'

const Home = () => {
  const [count, setCount] = useState(1)
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)

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

                <GooglePlacesInput placeholder='De' />
                <Text className='text-lg font-medium text-buttonColor'>
                  Destino
                </Text>
                <GooglePlacesInput placeholder='A' />
                <DatePickerModal />

                <View className='flex-row justify-between items-center my-3'>
                  <SeatsInput />
                  <TouchableOpacity className='flex-row justify-center rounded-full bg-primary p-4 w-2/4 self-center'>
                    <Text className='text-white dark:text-black font-bold'>
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
