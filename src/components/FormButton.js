import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const FormButton = ({ buttonTitle, ...rest }) => {
  return (
    <TouchableOpacity {...rest} className='w-64 mb-5 mt-5 bg-buttonColor py-3 rounded-full'>
      <Text className='shado text-white font-bold py-2 px-4 rounded text-center'>
        {buttonTitle}
      </Text>
    </TouchableOpacity>
  )
}

export default FormButton
