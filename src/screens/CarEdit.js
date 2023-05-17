import React from 'react'
import { View, Button } from 'react-native'
import SeachDropdown from '../components/SearchDropdown.js'

const CarEdit = ({ navigation }) => {
  // Lógica y contenido de la pantalla de edición del coche
  return (
    <View>
      <SeachDropdown />
      <Button title='Volver' onPress={() => navigation.goBack()} />
    </View>
  )
}

export default CarEdit
