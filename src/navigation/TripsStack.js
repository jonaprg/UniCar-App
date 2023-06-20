import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ListTrips from '../screens/ListTrips.js'
import DetailTrip from '../screens/DetailTrip.js'
import ProfileUser from '../screens/ProfileUser.js'
import ChatScreen from '../screens/ChatScreen.js'

const Stack = createNativeStackNavigator()

const TripsStack = () => {
  return (
    <Stack.Navigator initialRouteName='ListTrips'>
      <Stack.Screen
        name='ListTrips'
        component={ListTrips}
        options={{
          title: 'Rutas',
          headerStyle: {
            backgroundColor: '#488484'
          },
          headerTintColor: '#fff'
        }}
        // Configuración para la pantalla de edición del coche
      />
      <Stack.Screen
        name='DetailTrip'
        component={DetailTrip}
        options={{
          title: 'Detalle de la ruta',
          headerStyle: {
            backgroundColor: '#488484'
          },
          headerTintColor: '#fff'
        }}
      />
      <Stack.Screen
        name='ProfileUser'
        component={ProfileUser}
        options={{
          title: 'Perfil de usuario',
          headerStyle: {
            backgroundColor: '#488484'
          },
          headerTintColor: '#fff'
        }}
      />
      <Stack.Screen
        name='ChatScreen'
        component={ChatScreen}
        options={{
          title: 'Chat',
          headerStyle: {
            backgroundColor: '#488484'
          },
          headerTintColor: '#fff'
        }}
        // Configuración para la pantalla de edición del coche
      />
    </Stack.Navigator>

  )
}

export default TripsStack
