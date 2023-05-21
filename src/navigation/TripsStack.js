
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ListTrips from '../screens/ListTrips.js'

const Stack = createNativeStackNavigator()

const TripsStack = () => {
  return (
    <Stack.Navigator initialRouteName='ListTrips'>
      <Stack.Screen
        name='ListTrips'
        component={ListTrips}
        options={{ title: 'Rutas' }}
        // Configuración para la pantalla de edición del coche
      />
    </Stack.Navigator>
  )
}

export default TripsStack
