import React from 'react'
import { Text, View, TextInput } from 'react-native'

const FormInput = ({ name, placeholder, ...rest }) => {
  return (
    <View>
      <Text className='block text-gray-800 font-bold pr-4'>{name}</Text>
      <TextInput
        numberOfLines={1}
        placeholder={placeholder}
        placeholderTextColor='#666'
        {...rest}
        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-buttonColor'
      />
    </View>
  )
}

export default FormInput
