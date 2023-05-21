import React, { useState } from 'react'
import {
  View, Text, TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard, Platform
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind'
import GooglePlacesInput from '../components/GooglePlacesInput.js'
import DatePickerModal from '../components/DatePicker.js'

const CreateTrip = () => {
  const [count, setCount] = useState(1)
  const { colorScheme } = useColorScheme()

  const handleDecreaseCount = () => {
    if (count > 1 && count <= 4) {
      setCount(count - 1)
    }
  }

  const handleIncreaseCount = () => {
    if (count < 4 && count >= 1) {
      setCount(count + 1)
    }
  }

  const handlePlaceSelected = (data) => {
    console.log('Place selected:', data)
    // Hacer algo con el valor seleccionado
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
        <View className='bg-primary flex-1'>
          <View className='p-5'>
            <Text className='text-2xl font-bold text-secondary'>
              ¿Donde quieres ir?
            </Text>
            <View className='w-full bg-secondary rounded-3xl p-5 my-5'>
              <View className='mt-5'>
                <Text className='text-lg font-medium text-black/60'>
                  Origen
                </Text>

                <GooglePlacesInput placeholder='De' onPlaceSelected={handlePlaceSelected} />
                <Text className='text-lg font-medium text-black/60'>
                  Destino
                </Text>
                <GooglePlacesInput placeholder='A' />
                <DatePickerModal />
                <View className='flex-row justify-between items-center my-5'>
                  <View className='flex-row justify-center items-center gap-3'>
                    <AntDesign
                      name='minuscircleo'
                      size={24}
                      color={colorScheme === 'light' ? 'black' : 'white'}
                      onPress={handleDecreaseCount}
                    />
                    <Text className='text-xl dark:text-white'>{count}</Text>
                    <AntDesign
                      name='pluscircleo'
                      size={24}
                      color={colorScheme === 'light' ? 'black' : 'white'}
                      onPress={handleIncreaseCount}
                    />
                  </View>
                  <TouchableOpacity className='flex-row justify-center rounded-full bg-buttonColor p-3 w-2/4 self-center'>
                    <Text className='text-white dark:text-black font-bold'>
                      Publicar viaje
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

export default CreateTrip
