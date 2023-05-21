
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CreateTrip from '../screens/CreateTrip.js'

const Stack = createNativeStackNavigator()

const DriverStack = () => {
  return (
    <Stack.Navigator initialRouteName='CreateTrip'>
      <Stack.Screen
        name='CreateTrip'
        component={CreateTrip}
        options={{ title: 'Publicar' }}
        // Configuración para la pantalla de edición del coche
      />
    </Stack.Navigator>
  )
}

export default DriverStack
