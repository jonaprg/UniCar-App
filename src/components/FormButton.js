import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const FormButton = ({ buttonTitle, ...rest }) => {
  return (
    <TouchableOpacity {...rest} className='w-64 bg-blueColor py-4 px-4 mt-4 rounded-full'>
      <Text className='text-white font-bold text-center'>
        {buttonTitle}
      </Text>
    </TouchableOpacity>
  )
}

export default FormButton
