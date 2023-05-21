
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home.js'
import SearchTrips from '../screens/SearchTrips.js'

const Stack = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name='Home'
        component={Home}
        options={{ headerShown: false }}
        // Configuración para la pantalla de perfil
      />
      <Stack.Screen
        name='SearchTrips'
        component={SearchTrips}
        options={{ title: 'Rutas' }}
        // Configuración para la pantalla de edición del coche
      />
    </Stack.Navigator>
  )
}

export default HomeStack
