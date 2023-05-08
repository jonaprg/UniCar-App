import React from 'react'
import { Text, View, TextInput } from 'react-native'

const FormInput = ({ name, placeholder, ...rest }) => {
  return (
    <View className='mb-4 w-64'>
      <Text className='block text-gray-800 text-base font-bold '>{name}</Text>
      <TextInput
        numberOfLines={1}
        placeholder={placeholder}
        placeholderTextColor='gray'
        {...rest}
        className='px-3 py-3 bg-white border-gray-300  rounded-md'
      />
    </View>
  )
}

export default FormInput
