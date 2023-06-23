import React, { useState } from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const FormPasswordInput = ({ name, onChangeText, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <View className='mb-4 w-64 '>
      <Text className='block text-blueColor text-lg font-bold  '>{name}</Text>
      <View className='flex-row items-center'>
        <TextInput
          className='px-3 py-3 bg-white border-gray-300  rounded-md flex-1'
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
          placeholder='Contraseña'
          placeholderTextColor='gray'
          autoCapitalize='none'
          {...rest}
        />
        <TouchableOpacity className='absolute right-3' onPress={togglePasswordVisibility}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color='#023047' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default FormPasswordInput
