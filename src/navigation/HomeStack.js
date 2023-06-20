import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home.js'
import TripsSearch from '../screens/TripsSearch.js'
import DetailTripSearch from '../screens/DetailTripSearch.js'
import TripReservation from '../screens/TripReservation.js'
import ProfileUserSearch from '../screens/ProfileUserSearch.js'
import RequestTrip from '../screens/RequestTrip.js'
import ChatScreen from '../screens/ChatScreen.js'

const Stack = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name='Home'
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='TripsSearch'
        component={TripsSearch}
        options={{
          title: 'Tú busqueda',
          headerStyle: {
            backgroundColor: '#488484'
          },
          headerTintColor: '#fff'
        }}
      />
      <Stack.Screen
        name='DetailTripSearch'
        component={DetailTripSearch}
        options={{
          title: 'Detalle del viaje',
          headerStyle: {
            backgroundColor: '#488484'
          },
          headerTintColor: '#fff'
        }}
      />
      <Stack.Screen
        name='ProfileUserSearch'
        component={ProfileUserSearch}
        options={{
          title: 'Perfil del usuario',
          headerStyle: {
            backgroundColor: '#488484'

          },
          headerTintColor: '#fff'
        }}
      />
      <Stack.Screen
        name='TripReservation'
        component={TripReservation}
        options={{
          title: 'Resumen del viaje',
          headerStyle: {
            backgroundColor: '#488484'
          },
          headerTintColor: '#fff'
        }}
      />
      <Stack.Screen
        name='RequestTrip'
        component={RequestTrip}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#488484'
          }

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

export default HomeStack
