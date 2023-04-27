import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const FormButton = ({ buttonTitle, ...rest }) => {
  return (
    <TouchableOpacity {...rest}>
      <Text>{buttonTitle}</Text>
    </TouchableOpacity>
  )
}

export default FormButton