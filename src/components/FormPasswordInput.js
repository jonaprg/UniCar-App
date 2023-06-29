import React, { useState } from 'react'
import { View, TextInput, Text, TouchableOpacity, Platform, StatusBar } from 'react-native'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import Tooltip from 'react-native-walkthrough-tooltip'

const FormPasswordInput = ({ name, onChangeText, hint, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showTip, setTip] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <View className='mb-4 w-64 '>
      <View className='flex-row items-center'>
        <Text className='block text-blueColor text-lg font-bold  '>{name}</Text>
        {hint && (
          <Tooltip
            isVisible={showTip}
            content={
              <View>
                <Text> {hint} </Text>
              </View>
          }
            onClose={() => setTip(false)}
            placement='bottom'
        // below is for the status bar of react navigation bar
            topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
          >
            <TouchableOpacity onPress={() => setTip(true)} className='ml-2'>
              <FontAwesome5 name='info-circle' size={18} color='black' />
            </TouchableOpacity>
          </Tooltip>
        )}
      </View>
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
