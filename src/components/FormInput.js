import React from 'react'
import { View, TextInput } from 'react-native'

const FormInput = ({ value, placeholder, ...rest }) => {
  return (
    <View>
      <View className='flex-row items-center'>
        
      </View>
      <TextInput
        value={value}
        numberOfLines={1}
        placeholder={placeholder}
        placeholderTextColor='#666'
        {...rest}
      />
    </View>
  )
}

export default FormInput